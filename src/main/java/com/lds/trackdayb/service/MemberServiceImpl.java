package com.lds.trackdayb.service;

import java.util.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.lds.trackdayb.dto.MemberInfo;
import com.lds.trackdayb.entity.MemberEntity;
import com.lds.trackdayb.dto.TokenDTO;
import com.lds.trackdayb.dto.TokenRequestDTO;
import com.lds.trackdayb.entity.SnsLinkInfo;
import com.lds.trackdayb.exception.*;
import com.lds.trackdayb.jwt.TokenProvider;
import com.lds.trackdayb.repository.MemberRepository;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.util.SecurityUtil;

import org.apache.commons.lang3.StringUtils;
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

import javax.servlet.http.HttpServletRequest;

import static com.lds.trackdayb.util.RSAHelper.RSApreprocess;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl extends MemberService {

    @Value("${sns.google.client-id}")
    private String SNS_GOOGLE_CLIENT_ID;

    @Value("${sns.google.client-secret}")
    private String SNS_GOOGLE_CLIENT_SECRET;

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
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

    // public User signup(UserDto userDto) {
    // if
    // (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null)
    // != null) {
    // throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
    // }

    // //빌더 패턴의 장점
    // Authority authority = Authority.builder()
    // .authorityName("ROLE_USER")
    // .build();

    // User user = User.builder()
    // .username(userDto.getUsername())
    // .password(passwordEncoder.encode(userDto.getPassword()))
    // .nickname(userDto.getNickname())
    // .authorities(Collections.singleton(authority))
    // .activated(true)
    // .build();

    // return userRepository.save(user);
    // }

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
        // [2]
        return memberInfo;
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
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDTO.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        MemberEntity currentMemberEntity = memberRepository.findByMemberId(authentication.getName());

        String dbRefreshTokenValue = currentMemberEntity.getRefreshToken();

        // 3. Refresh Token 일치하는지 검사
        if (!StringUtils.equals(tokenRequestDTO.getRefreshToken(), dbRefreshTokenValue)) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 4. 새로운 토큰 생성 및 리턴.
        return tokenProvider.createAccessTokenOnly(authentication);
    }

    @Override
    public String googleAuthServerAuthenticate(String tokenId) throws Exception {
        String email = "";

//        //HTTP Request를 위한 RestTemplate
//        RestTemplate restTemplate = new RestTemplate();

//        String CLIENT_ID = "618262920527-sl1h49hr7mugct12j5ab5g0q10kaso6n.apps.googleusercontent.com";
//        String clientSecret = "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";
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
                    throw new Exception();
                }
            } else {
                LOGGER.info("test tokensignin : {}","Invalid ID token");
            }
        }catch (Exception e){
            throw new Exception();
        }
        return email;
    }

    @Override
    public MemberEntity simplesignup(MemberEntity memberEntity, String snsName, String linkedEmail) throws Exception{

        if (!ObjectUtils.isEmpty(memberRepository.findByMemberId(memberEntity.getUsername()))) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        memberEntity.setAuth("ROLE_USER");
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        memberDTO.setPassword(encoder.encode(memberDTO.getMemberId()));
        // 임으로 memberid email로 설정.
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



}
