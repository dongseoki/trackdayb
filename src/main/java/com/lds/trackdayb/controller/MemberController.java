package com.lds.trackdayb.controller;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.lds.trackdayb.dto.*;
import com.lds.trackdayb.entity.MemberEntity;
import com.lds.trackdayb.exception.*;
import com.lds.trackdayb.file.FileStore;
import com.lds.trackdayb.jwt.JwtFilter;
import com.lds.trackdayb.jwt.TokenProvider;
import com.lds.trackdayb.mvo.PublicKeyInfo;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.service.MemberService;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.util.SecurityUtil;

import com.lds.trackdayb.vo.MemberForm;
import com.lds.trackdayb.vo.SimpleSignUpVO;
import com.lds.trackdayb.vo.SnsAuthenticate;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;
import org.thymeleaf.util.StringUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.security.*;
import java.security.spec.RSAPublicKeySpec;
import java.util.*;

import static com.lds.trackdayb.util.RSAHelper.RSApreprocess;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final FileStore fileStore;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final ModelMapper modelMapper;
    private final ServletContext servletContext;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);

    @GetMapping("/google/auth")
    public String googleAuth(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "code") String authCode) throws JsonProcessingException {
        final String GOOGLE_TOKEN_BASE_URL ="https://oauth2.googleapis.com/token";

        //HTTP Request??? ?????? RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        String clientId = "XXXXXX";
        String clientSecret = "XXXXXXX";
        //Google OAuth Access Token ????????? ?????? ???????????? ??????
        GoogleOAuthRequest googleOAuthRequestParam = GoogleOAuthRequest
                .builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .code(authCode)
                .redirectUri("http://localhost:8080/member/google/auth")
                .grantType("authorization_code").build();


        //JSON ????????? ?????? ????????? ??????
        //????????? ??????????????? ???????????? ???????????? ??????????????? Object mapper??? ?????? ???????????????.
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        //AccessToken ?????? ??????
        ResponseEntity<String> resultEntity = restTemplate.postForEntity(GOOGLE_TOKEN_BASE_URL, googleOAuthRequestParam, String.class);

        //Token Request
        GoogleOAuthResponse result = mapper.readValue(resultEntity.getBody(), new TypeReference<GoogleOAuthResponse>() {
        });

        //ID Token??? ?????? (???????????? ????????? jwt??? ????????? ????????????)
        String jwtToken = result.getIdToken();
        String requestUrl = UriComponentsBuilder.fromHttpUrl("https://oauth2.googleapis.com/tokeninfo")
                .queryParam("id_token", jwtToken).encode().toUriString();

        String resultJson = restTemplate.getForObject(requestUrl, String.class);

        Map<String,String> userInfo = mapper.readValue(resultJson, new TypeReference<Map<String, String>>(){});

        LOGGER.info("test userInfo : {}",userInfo.toString());

        String redirect_uri = request.getScheme() + "://" +   // "http" + "://
                request.getServerName() +       // "myhost"
                ":" + request.getServerPort(); // ":" + "8080"
        try{
            response.sendRedirect(redirect_uri);
        }catch (Exception exception){

        }
        return "success?";
    }

    @PostMapping("/google/tokensignin")
    public String googleTokensignin(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "idtoken") String idTokenString) throws JsonProcessingException {
        final String GOOGLE_TOKEN_BASE_URL ="https://oauth2.googleapis.com/token";

        //HTTP Request??? ?????? RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        String CLIENT_ID = "618262920527-sl1h49hr7mugct12j5ab5g0q10kaso6n.apps.googleusercontent.com";
        String clientSecret = "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";

        // google example code

        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList(CLIENT_ID))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();

// (Receive idTokenString by HTTPS POST)

        try{
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String email = payload.getEmail();
                boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String locale = (String) payload.get("locale");
                String familyName = (String) payload.get("family_name");
                String givenName = (String) payload.get("given_name");

                // Use or store profile information
                // ...
                LOGGER.info("test tokensignin : userId : {}, email : {} emailVerified:{}, name:{}, pictureUrl:{}, local:{}",userId,email,emailVerified,name,pictureUrl,locale);

            } else {
                LOGGER.info("test tokensignin : {}","Invalid ID token");
            }
        }catch (Exception e){

        }

        return "success?";
    }

    @PostMapping(value="/logout")
    public ResultMVO logout(HttpServletRequest request) {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        try {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();   // ?????? ??????
            }
        } catch (Exception e) {
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
            LOGGER.error("logout error {}", e.toString());
        }

    
        return resultMVO;
    }

    // ????????? ??????????????? ????????? login ??????.
    // @PostMapping(value = "/login")
    // public ResultMVO login(@RequestBody MemberDTO memberDTO,HttpServletRequest request){
    //     ResultMVO resultMVO = new ResultMVO();
    //     resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

    //     try {
    //         MemberDTO member = memberService.login(memberDTO.getMemberId(), memberDTO.getPassword());
    //         if (member == null){
    //             resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_LOGIN_FAIL);
    //             resultMVO.setMessage("please check your id and password");
    //         }else{
    //             resultMVO.setMemberId(member.getMemberId());
    //              // ????????? ?????? ??????
    //             HttpSession session = request.getSession();                         // ????????? ????????? ?????? ?????? ??????, ????????? ?????? ????????? ???????????? ??????
    //             session.setAttribute(SessionCodeUtil.LOGIN_MEMBER, member.getMemberId());   // ????????? ????????? ?????? ?????? ??????
    //         }
    //     } catch (Exception e) {
    //         resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
    //         LOGGER.error("login exception", e.toString());
    //         e.printStackTrace();
    //     }

    //     return resultMVO; 
    // }


    @PostMapping("/reissue")
    public ResponseEntity<ResultMVO> reissue(@Valid @RequestBody TokenRequestDTO tokenRequestDTO){
        ResultMVO resultMVO = new ResultMVO();
        HttpHeaders httpHeaders;
        httpHeaders = new HttpHeaders();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        // reissue
        TokenDTO tokenInfo =  memberService.reissue(tokenRequestDTO);
        resultMVO.setTokenInfo(tokenInfo);

        // anonymous issue. ?????? ????????? ?????? ?????? ???????????? ????????? ??????. ????????? ?????? ?????? ?????? ?????? ??????.
//            resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));

        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenInfo.getAccessToken());
        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<ResultMVO> authorize(@Valid @RequestBody MemberEntity memberEntity, HttpServletRequest request) throws Exception {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        HttpHeaders httpHeaders = new HttpHeaders();

        TokenDTO tokenInfo =  memberService.idPwdLogin(request, memberEntity);
        resultMVO.setTokenInfo(tokenInfo);
        resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
        resultMVO.setMemberInfo(memberService.getMyUserWithAuthorities());
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenInfo.getAccessToken());
        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/loginTest")
    public ResponseEntity<ResultMVO> authorizeTest(@Valid @RequestBody MemberEntity memberEntity, HttpServletRequest request) throws Exception {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        HttpHeaders httpHeaders = new HttpHeaders();


        // pwd ??? ????????????.
        memberService.RSApreprocessTest2(request, memberEntity);

        // spring security Authentication and create access and refreshtoken
        TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(memberService.springSecurityUsernamePasswordAuthenticate(memberEntity.getUsername(), memberEntity.getPassword()));

        // refresh token ??????.
        memberService.updateRefreshToken(memberEntity.getMemberId(),tokenInfo.getRefreshToken());


        resultMVO.setTokenInfo(tokenInfo);
        resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenInfo.getAccessToken());
        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/requestpublickey")
    public  ResponseEntity<ResultMVO> requestpublickey(HttpSession session) throws Exception{
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);


        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        KeyPair keyPair = generator.genKeyPair();
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey publicKey = keyPair.getPublic();
        String publicKeyStr = new String(Base64.getEncoder().encode(publicKey.getEncoded()));
        PrivateKey privateKey = keyPair.getPrivate();

        // ????????? ???????????? ???????????? ???????????? ???????????? ????????????.
        session.setAttribute("__rsaPrivateKey__", privateKey);
        // ???????????? ???????????? ???????????? JavaScript RSA ??????????????? ????????????.
        RSAPublicKeySpec publicSpec = keyFactory.getKeySpec(publicKey, RSAPublicKeySpec.class);
        String publicKeyModulus = publicSpec.getModulus().toString(16);
        String publicKeyExponent = publicSpec.getPublicExponent().toString(16);

        PublicKeyInfo publicKeyInfo = new PublicKeyInfo();
        publicKeyInfo.setPublicKeyModulus(publicKeyModulus);
        publicKeyInfo.setPublicKeyExponent(publicKeyExponent);
        publicKeyInfo.setPublicKeyStr(publicKeyStr);
        resultMVO.setPublicKeyInfo(publicKeyInfo);

        HttpHeaders httpHeaders = new HttpHeaders();
        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
    }

    // login interceptor??? ????????? ?????????.
    // @PostMapping(value = "/signup")
    // public ResultMVO signup(@RequestBody MemberDTO memberDTO){
    //     ResultMVO resultMVO = new ResultMVO();
    //     resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
    //     try {
    //         memberService.save(memberDTO);
    //     } catch (Exception e) {
    //         LOGGER.error("signup error : {}", e.toString());
    //         resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
    //         resultMVO.setMessage("signup fail.");
    //     }

    //     return resultMVO;
    // }

    @PostMapping(value="/simplesignup/{snsName}")
    public ResultMVO simpleSignUp(@PathVariable("snsName") String snsName, @RequestBody SimpleSignUpVO simpleSignUpVO) throws Exception {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        String email="";
        if(Arrays.asList(CommonCodeUtil.supportSNSarr).contains(snsName) == false){
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_UNSUPPORT_SNS);
            resultMVO.setMessage("unsupported sns");
        }else{
            MemberEntity memberEntity = new MemberEntity();
            memberEntity.setName(simpleSignUpVO.getName());
            if(StringUtils.equals(snsName,"google")){
                email = memberService.googleAuthServerAuthenticate(simpleSignUpVO.getTokenId());
                memberEntity.setMemberId(simpleSignUpVO.getMemberId());
            }
            MemberEntity memberInfo =memberService.simplesignup(memberEntity, snsName,email);


            // spring security Oauth2 Authentication and create access and refreshtoken
            TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(memberService.springSecurityOauth2Authenticate(memberEntity.getMemberId()));
            resultMVO.setTokenInfo(tokenInfo);

            // refresh token ??????.
            memberService.updateRefreshToken(memberEntity.getMemberId(),tokenInfo.getRefreshToken());

            // memberId & memberInfo
            resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
            resultMVO.setMemberInfo(memberService.getMyUserWithAuthorities());

        }
        return resultMVO;
    }

    @PostMapping(value="/changepwd")
    public ResultMVO changePassword(HttpServletRequest request,@RequestBody PasswordChangeDTO passwordChangeDTO) throws Exception {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        memberService.changePassword(request,passwordChangeDTO,memberService.getMyUserWithAuthorities());

        return resultMVO;
    }

    @DeleteMapping(value="/withdrawal")
    public ResultMVO withdrawal() throws Exception {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        MemberInfo memberInfo = memberService.getMyUserWithAuthorities();
        memberService.withdrawal(memberInfo.getMemberSerialNumber());
        return resultMVO;
    }

    @PatchMapping(value="/linkaccount/{snsName}")
    public ResultMVO linkAccount(@PathVariable("snsName") String snsName, @RequestBody SnsAuthenticate snsAuthenticate) throws Exception {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        String email="";
        MemberInfo memberInfo = new MemberInfo();
        if(Arrays.asList(CommonCodeUtil.supportSNSarr).contains(snsName) == false){
            throw new UnsupportSnsException("unsupported sns");
        }else{
            if(StringUtils.equals(snsName,"google")){
                email = memberService.googleAuthServerAuthenticate(snsAuthenticate.getTokenId());
            }
            memberInfo = memberService.getMyUserWithAuthorities();
            memberService.linkAccount(memberInfo, snsName,email);
        }

        // spring security Oauth2 Authentication and create access and refreshtoken
        TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(memberService.springSecurityOauth2Authenticate(memberInfo.getMemberId()));
        resultMVO.setTokenInfo(tokenInfo);

        // refresh token ??????.
        memberService.updateRefreshToken(memberInfo.getMemberId(),tokenInfo.getRefreshToken());

        // memberId & memberInfo
        resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
        resultMVO.setMemberInfo(memberService.getMyUserWithAuthorities());

        return resultMVO;
    }

    @PostMapping(value="/snslogin/{snsName}")
    public ResponseEntity<ResultMVO>  snslogin(@PathVariable("snsName") String snsName, @RequestBody SnsAuthenticate snsAuthenticate) throws Exception {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        String email="";
        HttpHeaders httpHeaders = new HttpHeaders();
        MemberEntity memberInfo;

        if(Arrays.asList(CommonCodeUtil.supportSNSarr).contains(snsName) == false){
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_UNSUPPORT_SNS);
            resultMVO.setMessage("unsupported sns");
        }else{
            MemberEntity memberEntity = new MemberEntity();
            memberEntity.setName(snsAuthenticate.getName());
            if(StringUtils.equals(snsName,"google")){
                email = memberService.googleAuthServerAuthenticate(snsAuthenticate.getTokenId());
            }
            memberInfo = memberService.snslogin(email);
            // spring security Oauth2 Authentication and create access and refreshtoken
            TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(memberService.springSecurityOauth2Authenticate(memberInfo.getMemberId()));
            resultMVO.setTokenInfo(tokenInfo);

            // refresh token ??????.
            memberService.updateRefreshToken(memberEntity.getMemberId(),tokenInfo.getRefreshToken());

            // memberId & memberInfo
            resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
            resultMVO.setMemberInfo(memberService.getMyUserWithAuthorities());

            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenInfo.getAccessToken());
        }

        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
    }

    @PostMapping(value = "/signup")
    public ResultMVO signup(@RequestBody MemberEntity memberEntity, HttpServletRequest request) throws Exception {
        ResultMVO resultMVO = new ResultMVO();

        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        TokenDTO tokenInfo =memberService.signup(request, memberEntity);
        resultMVO.setTokenInfo(tokenInfo);

        // memberId
        resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
        resultMVO.setMemberInfo(memberService.getMyUserWithAuthorities());
        return resultMVO;
    }



    @GetMapping("/currentUser")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public String getMyUserInfo(HttpServletRequest request) {
//        String testPath = servletContext.getRealPath("/");
//        System.out.println("testPath = " + testPath);
//        String testPath2 = servletContext.getContextPath();
//        System.out.println("testPath2 = " + testPath2);
//        System.out.println("testPath3 =" + System.getProperty("user.dir"));
//        System.out.println("testPath4 =" + fileStore.getFullPath("testfile.txt"));
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);
        MemberInfo memberInfo =memberService.getMyUserWithAuthorities();
        jo.add("memberInfo", new Gson().toJsonTree(memberInfo));
        return jo.toString();
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<MemberEntity> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(memberService.getUserWithAuthorities(username));
    }

    @PostMapping("/memberinfo")
    public ResultMVO changeMemberInfo(@ModelAttribute MemberForm memberForm) throws IOException {

        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        memberForm.setMemberSerialNumber(memberService.getMyUserWithAuthorities().getMemberSerialNumber());
        memberService.changeMemberInfo(memberForm);

        // ????????? ????????? ???????????? ??????.
        resultMVO.setMemberInfo(memberService.getMyUserWithAuthorities());
        return resultMVO;
    }

    @GetMapping("/image/{filename}")
    public Resource downloadImage(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:"+fileStore.getFullPath(filename));
    }

    @DeleteMapping("/unlinkaccount/{snsName}")
    public ResultMVO unlinkAccount(@PathVariable("snsName") String snsName) throws IOException {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        if(Arrays.asList(CommonCodeUtil.supportSNSarr).contains(snsName) == false){
            throw new UnsupportSnsException("unsupported sns");
        }
        MemberInfo memberInfo = new MemberInfo();
        memberInfo = memberService.getMyUserWithAuthorities();
        memberService.unlinkAccount(memberInfo, CommonCodeUtil.snsNameToTypeMap.get(snsName));
        resultMVO.setMemberInfo(memberService.getMyUserWithAuthorities());
        return resultMVO;
    }
}
