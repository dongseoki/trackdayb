package com.lds.trackdayb.service;

import java.io.File;
import java.io.IOException;
import java.security.PrivateKey;
import java.util.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.lds.trackdayb.dto.MemberInfo;
import com.lds.trackdayb.dto.PasswordChangeDTO;
import com.lds.trackdayb.entity.UploadFile;
import com.lds.trackdayb.entity.MemberEntity;
import com.lds.trackdayb.dto.TokenDTO;
import com.lds.trackdayb.dto.TokenRequestDTO;
import com.lds.trackdayb.entity.SnsLinkInfo;
import com.lds.trackdayb.exception.*;
import com.lds.trackdayb.file.FileStore;
import com.lds.trackdayb.jwt.TokenProvider;
import com.lds.trackdayb.repository.FileRepository;
import com.lds.trackdayb.repository.MemberRepository;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.util.SecurityUtil;

import com.lds.trackdayb.vo.MemberForm;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static com.lds.trackdayb.util.CommonCodeUtil.supportFilePartNameToFilePartIdMap;
import static com.lds.trackdayb.util.RSAHelper.*;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl extends MemberService {

    @Value("${sns.google.client-id}")
    private String SNS_GOOGLE_CLIENT_ID;

    private final FileRepository fileRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final FileStore fileStore;
    private final ModelMapper modelMapper;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    static final Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);

    @Override
    public String save(MemberEntity memberEntity) {
        // MessageDigest md = null;
        // try {
        // md = MessageDigest.getInstance("SHA-512");
        // } catch (NoSuchAlgorithmException e) {
        // e.printStackTrace();
        // }
        // md.update(memberDTO.getPassword().getBytes());
        // String hex = String.format("%0128x", new BigInteger(1, md.digest()));
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        memberEntity.setPassword(encoder.encode(memberEntity.getPassword()));
        memberRepository.save(memberEntity);
        return memberEntity.getMemberId();
    }

    @Override
    public MemberEntity login(String memberId, String password) {
        // TODO Auto-generated method stub
        HashMap<String, String> param = new HashMap<>();
        param.put("memberId", memberId);
        param.put("password", password);

        return memberRepository.findByMemberIdAndPassword(param);
    }

    @Override
    public MemberEntity loadUserByUsername(String memberId) throws UsernameNotFoundException {
        // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
        MemberEntity memberEntity = memberRepository.findByMemberId(memberId);
        if (memberEntity == null || StringUtils.isEmpty(memberEntity.getMemberId())) {
            throw new UsernameNotFoundException(memberId);
        }
        if(StringUtils.equals(memberEntity.getDeletionStatus(),"Y")){
            throw new DeletedUserException("this is deleted user");
        }

        return memberEntity;
    }

    @Override
    public TokenDTO signup(HttpServletRequest request, MemberEntity memberEntity) throws Exception{
        // RSA 복호화를 하여 password 해석.
        memberEntity =  RSApreprocess(request, memberEntity);
        String rsaDecrytedPwd = memberEntity.getPassword();



        if (!ObjectUtils.isEmpty(memberRepository.findByMemberId(memberEntity.getUsername()))) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        String passwordMessage = SecurityUtil.isValidPassword(memberEntity.getPassword());
        String idMessage = SecurityUtil.isValidMemberId(memberEntity.getMemberId());
        if(! StringUtils.equals(passwordMessage, CommonCodeUtil.SUCCESS)){
            throw new ValidateException(passwordMessage);
        }
        if(! StringUtils.equals(idMessage, CommonCodeUtil.SUCCESS)){
            throw new ValidateException(idMessage);
        }
        memberEntity.setAuth("ROLE_USER");
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        memberEntity.setPassword(encoder.encode(memberEntity.getPassword()));
        memberRepository.save(memberEntity);

        // spring security Authentication and create access and refreshtoken
        TokenDTO tokenDTO = tokenProvider.createAccessAndRefreshToken(springSecurityUsernamePasswordAuthenticate(memberEntity.getUsername(), rsaDecrytedPwd));

        // refresh token 수정.
        updateRefreshToken(memberEntity.getMemberId(),tokenDTO.getRefreshToken());

        return tokenDTO;
    }

    @Override
    public Authentication springSecurityUsernamePasswordAuthenticate(String memberId, String decodedPassword) throws Exception {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, decodedPassword);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }


    public MemberEntity getUserWithAuthorities(String memberId) {
        return memberRepository.findByMemberId(memberId);
    }

    public MemberInfo getMyUserWithAuthorities() {

        // no jwt test code.
        // 테스트 시 아래 [1]번 주석을 풀고, 하단 [2]번을 주석처리 하시면 됩니다.
        // 테스트 완료 후 원상복구 하면 됩니다.

        // [1]
        // MemberDTO memberDTO = new MemberDTO();
        // memberDTO.setMemberSerialNumber("1");
        // return memberDTO;

        MemberEntity memberEntity =  memberRepository.findByMemberId(SecurityUtil.getCurrentUsername().orElse(null));
        List<SnsLinkInfo> snsLinkInfoList = memberRepository.findAllSnsLinkInfo(memberEntity.getMemberSerialNumber());
        MemberInfo memberInfo = modelMapper.map(memberEntity,MemberInfo.class);
        memberInfo.setSnsLinkInfoList(snsLinkInfoList);

        // photoUrlPath setting
        if(!StringUtils.isEmpty(memberInfo.getProfilePhotoId())){
            memberInfo.setProfilePhotoUrlPath(getFileUrlPath(memberInfo.getProfilePhotoId()));
        }
        if(!StringUtils.isEmpty(memberInfo.getBackgroundPhotoId())){
            memberInfo.setBackgroundPhotoUrlPath(getFileUrlPath(memberInfo.getBackgroundPhotoId()));
        }

        // [2]
        return memberInfo;
    }
    private String getFileUrlPath(String photoId){
        return StringUtils.defaultString("/member/image/"+fileRepository.getFileInfo(photoId).getStoreFileName());
    }

    @Override
    public void updateRefreshToken(String memberId, String refreshToken) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setMemberId(memberId);
        memberEntity.setRefreshToken(refreshToken);
        memberRepository.updateRefreshToken(memberEntity);
    }

    @Override
    public TokenDTO reissue(TokenRequestDTO tokenRequestDTO) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDTO.getRefreshToken())) {
            throw new InvalidRefreshTokenException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDTO.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        MemberEntity currentMemberEntity = memberRepository.findByMemberId(authentication.getName());

        String dbRefreshTokenValue = currentMemberEntity.getRefreshToken();

        // 3. Refresh Token 일치하는지 검사
        if (!StringUtils.equals(tokenRequestDTO.getRefreshToken(), dbRefreshTokenValue)) {
            throw new InvalidRefreshTokenException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 4. 새로운 토큰 생성 및 리턴.
        return tokenProvider.createAccessTokenOnly(authentication);
    }

    @Override
    public String googleAuthServerAuthenticate(String tokenId) throws Exception {
        String email = "";

//        //HTTP Request를 위한 RestTemplate
//        RestTemplate restTemplate = new RestTemplate();

        // google example code

        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                        // Specify the CLIENT_ID of the app that accesses the backend:
                        .setAudience(Collections.singletonList(SNS_GOOGLE_CLIENT_ID))
                        // Or, if multiple clients access the backend:
                        //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                        .build();

// (Receive idTokenString by HTTPS POST)

        try{
            GoogleIdToken idToken = verifier.verify(tokenId);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                email = payload.getEmail();
                boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String locale = (String) payload.get("locale");
                String familyName = (String) payload.get("family_name");
                String givenName = (String) payload.get("given_name");

                // Use or store profile information
                // ...
                LOGGER.info("test tokensignin : userId : {}, email : {} emailVerified:{}, name:{}, pictureUrl:{}, local:{}",userId,email,emailVerified,name,pictureUrl,locale);
                if (StringUtils.isEmpty(email) || emailVerified == false){
                    throw new SnsAuthServerException("emailVerified false.");
                }
            } else {
                LOGGER.info("test tokensignin : {}","Invalid ID token");
            }
        }catch (Exception e){
            throw new SnsAuthServerException("unexpected sns auth server fail.");
        }
        return email;
    }

    @Override
    public MemberEntity simplesignup(MemberEntity memberEntity, String snsName, String linkedEmail) throws Exception{
        String idMessage = SecurityUtil.isValidMemberId(memberEntity.getMemberId());
        if(! StringUtils.equals(idMessage, CommonCodeUtil.SUCCESS)){
            throw new ValidateException(idMessage);
        }

        if (!ObjectUtils.isEmpty(memberRepository.findByMemberId(memberEntity.getUsername()))) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        memberEntity.setAuth("ROLE_USER");
        memberRepository.save(memberEntity);
        MemberInfo memberInfo = modelMapper.map(memberEntity,MemberInfo.class);
        linkAccount(memberInfo,snsName,linkedEmail);

        return memberEntity;
    }

    @Override
    public void linkAccount(MemberInfo memberInfo, String snsName, String linkedEmail) throws Exception {
        SnsLinkInfo snsLinkInfo = new SnsLinkInfo();
        snsLinkInfo.setMemberSerialNumber(memberInfo.getMemberSerialNumber());
        snsLinkInfo.setSnsType(CommonCodeUtil.snsNameToTypeMap.get(snsName));
        snsLinkInfo.setLinkedEmail(linkedEmail);
        memberRepository.upsertSnsLinkInfo(snsLinkInfo);

        List<SnsLinkInfo> snsLinkInfoList = memberRepository.selectDuplicateLinkedEmailInSnsLinkInfo(linkedEmail);
        if(snsLinkInfoList != null &&  snsLinkInfoList.size()>=2){
            throw new DuplicateLinkedEmailException("DuplicateLinkedEmailException");
        }
    }

    @Override
    public void withdrawal(String memberSerialNumber) throws Exception {
        memberRepository.withdrawal(memberSerialNumber);
        memberRepository.deleteSnsLinkInfo(memberSerialNumber);
    }

    @Override
    public MemberEntity snslogin(String email) throws Exception {
        MemberEntity memberEntity = memberRepository.findByLinkedEmail(email);
        if (memberEntity == null || StringUtils.isEmpty(memberEntity.getMemberId())) {
            throw new NoLinkedMemberException("no such linked member.");
        }
        return memberEntity;
    }

    @Override
    public TokenDTO idPwdLogin(HttpServletRequest request, MemberEntity memberEntity) throws Exception {
        // pwd 를 복호화함.
        memberEntity =  RSApreprocess(request, memberEntity);

        // spring security Authentication and create access and refreshtoken
        TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(springSecurityUsernamePasswordAuthenticate(memberEntity.getUsername(), memberEntity.getPassword()));

        // refresh token 수정.
        updateRefreshToken(memberEntity.getMemberId(),tokenInfo.getRefreshToken());
        return tokenInfo;
    }

    @Override
    public Authentication springSecurityOauth2Authenticate(String memberId) {
        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("sub", memberId);
        Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        // make OAuth2AuthenticationToken
        OAuth2User user = new DefaultOAuth2User(authorities, userDetails, "sub");
        OAuth2AuthenticationToken oAuth2AuthenticationToken = new OAuth2AuthenticationToken(user, authorities, "oidc");
        SecurityContextHolder.getContext().setAuthentication(oAuth2AuthenticationToken);
        return oAuth2AuthenticationToken;
    }


    public void RSApreprocessTest2(HttpServletRequest request, MemberEntity memberEntity) throws Exception {
        HttpSession session = request.getSession();
        PrivateKey privateKey = (PrivateKey) session.getAttribute("__rsaPrivateKey__");
        session.removeAttribute("__rsaPrivateKey__"); // 키의 재사용을 막는다. 항상 새로운 키를 받도록 강제.
        if (privateKey == null) {
            throw new RuntimeException("암호화 비밀키 정보를 찾을 수 없습니다.");
        }
        String decodedMemberId = decryptRsa(privateKey, memberEntity.getMemberId());
        String decodedPassword = decryptRsa(privateKey, memberEntity.getPassword());
        memberEntity.setMemberId(decodedMemberId);
        memberEntity.setPassword(decodedPassword);
        return;
    }

    @Override
    public void changePassword(HttpServletRequest request, PasswordChangeDTO passwordChangeDTO, MemberInfo memberInfo) throws Exception {
        //        RSApreprocess  로 복호화를 한다.
        List<String> ciphertextList = new ArrayList<>();
        ciphertextList.add(passwordChangeDTO.getBeforePwd());
        ciphertextList.add(passwordChangeDTO.getAfterPwd());
        List<String> decrytedTextList = RSApreprocessUsingList(request,ciphertextList);

        MemberEntity member = new MemberEntity();
        member.setPassword(decrytedTextList.get(0));

         if(!passwordEncoder.matches(member.getPassword(), memberRepository.findByMemberId(memberInfo.getMemberId()).getPassword()) ){
             throw new UsernameNotFoundException(memberInfo.getMemberId());
         }

//      신규 비밀번호의 유효성을 확인한다.
        String passwordMessage = SecurityUtil.isValidPassword(decrytedTextList.get(1));
        if(! StringUtils.equals(passwordMessage, CommonCodeUtil.SUCCESS)){
            throw new ValidateException(passwordMessage);
        }

//        비밀번호를 수정한다.
        //            신규 패스워드 BCrypt 암호화 하고 수정.
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Map<String, String> changePasswordParam = new HashMap<String, String>();
        changePasswordParam.put("newPassword",encoder.encode(decrytedTextList.get(1)));
        changePasswordParam.put("memberSerialNumber", memberInfo.getMemberSerialNumber());
        memberRepository.changePassword(changePasswordParam);
    }

    @Override
    public void changeMemberInfo(MemberForm memberForm) throws IOException {
        // text 값 처리.
        // 유효성 체크.(필요시).

        // text 저장 메서드 호출.
        memberRepository.updateMemberTextInfo(memberForm);

        // file 처리시도.
        if(!ObjectUtils.isEmpty(memberForm.getProfilePhoto()) && !memberForm.getProfilePhoto().isEmpty())
            processMemberPhoto(memberForm.getProfilePhoto(),memberForm.getMemberSerialNumber());
        if(!ObjectUtils.isEmpty(memberForm.getBackgroundPhoto()) && !memberForm.getBackgroundPhoto().isEmpty())
            processMemberPhoto(memberForm.getBackgroundPhoto(),memberForm.getMemberSerialNumber());
    }

    @Override
    public void unlinkAccount(MemberInfo memberInfo, String snsType) throws IOException {
        Map<String, String> unlinkAccountVO = new HashMap<>();
        unlinkAccountVO.put("memberSerialNumber",memberInfo.getMemberSerialNumber());
        unlinkAccountVO.put("snsType",snsType);
        memberRepository.deleteSnsLinkAccountBySnsType(unlinkAccountVO);
    }

    private void processMemberPhoto(MultipartFile multipartFile,String memberSerialNumber) throws IOException {
        if(Arrays.asList(CommonCodeUtil.supportFilePartNameArr).contains(multipartFile.getName()) == false){
            throw new UnsupportFilePartNameException("unsupport file part name");
        }

        // 파일 각각에 대해 유효성체크.
        uploadFileValidateCheck(multipartFile);

        // (1) 기존 파일경로 및 파일 아이디 따로 저장하기.
        MemberInfo backupMemberInfo = getMyUserWithAuthorities();


        // 특정 경로에 파일 저장.
        UploadFile uploadFile = fileStore.storeFile(multipartFile);

        // memberFile 로 변경 예정.
        // 메모리 관리를 위한 삭제 처리.
        // 차후 논의.
//        fileStore.deleteFiles(memberSerialNumberber);

        // DB에 경로 저장.
        // 멤버 file id 변경.
        memberRepository.insertFile(uploadFile);
        Map<String, Integer> updateMemberFileIdVO = new HashMap<String,Integer>();
        updateMemberFileIdVO.put(supportFilePartNameToFilePartIdMap.get(uploadFile.getOriginalFileName()) , uploadFile.getFileId());
        updateMemberFileIdVO.put("memberSerialNumber",Integer.parseInt(memberSerialNumber));

        memberRepository.updateMemberFileId(updateMemberFileIdVO);

        String photoId = "";
        if(StringUtils.equals(uploadFile.getOriginalFileName(), "profilePhoto")){
            photoId = backupMemberInfo.getProfilePhotoId();
        }else if(StringUtils.equals(uploadFile.getOriginalFileName(), "backgroundPhoto")){
            photoId = backupMemberInfo.getBackgroundPhotoId();
        }

        if(StringUtils.isNotEmpty(photoId)){
            UploadFile deleteTargetFileInfo = fileRepository.getFileInfo(photoId);
            // (2) 기존 파일 DB에서도 삭제 처리하기.(업데이트.)
            fileRepository.deleteFileInfo(photoId);

            // (3) 기존 파일 삭제하기.
            File fileToDelete = new File(fileStore.getFullPath(deleteTargetFileInfo.getStoreFileName()));
            if (fileToDelete.exists()){
                if(fileToDelete.delete()){
                    LOGGER.debug("파일삭제 : 성공");
                }else{
                    LOGGER.debug("파일삭제 : 실패");
                }
            }else{
                LOGGER.debug("파일삭제 : 삭제할 파일이 존재하지 않음.");
            }
        }

    }

    private void uploadFileValidateCheck(MultipartFile profilePhoto) {
        if(profilePhoto.getContentType().contains("image/") == false){
            throw new InvalidFileTypeException("only image/* available");
        }
    }


}
