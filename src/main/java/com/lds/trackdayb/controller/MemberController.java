package com.lds.trackdayb.controller;

import javax.crypto.Cipher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.xml.transform.Result;

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
import com.lds.trackdayb.exception.*;
import com.lds.trackdayb.jwt.JwtFilter;
import com.lds.trackdayb.jwt.TokenProvider;
import com.lds.trackdayb.mvo.PublicKeyInfo;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.service.MemberService;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.util.SecurityUtil;

import com.lds.trackdayb.vo.SnsAuthenticate;
import ognl.Token;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.thymeleaf.util.StringUtils;

import java.lang.reflect.Member;
import java.security.*;
import java.security.spec.RSAPublicKeySpec;
import java.util.*;

import static com.lds.trackdayb.util.CommonCodeUtil.byteArrayToHex;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final ModelMapper modelMapper;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);

    @GetMapping("/google/auth")
    public String googleAuth(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "code") String authCode) throws JsonProcessingException {
//        final String GOOGLE_TOKEN_BASE_URL ="https://accounts.google.com/o/oauth2/v2/auth";
//        final String GOOGLE_TOKEN_BASE_URL ="https://accounts.google.com/o/oauth2/auth";
        final String GOOGLE_TOKEN_BASE_URL ="https://oauth2.googleapis.com/token";

        //HTTP Request를 위한 RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        String clientId = "618262920527-sl1h49hr7mugct12j5ab5g0q10kaso6n.apps.googleusercontent.com";
        String clientSecret = "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";
        //Google OAuth Access Token 요청을 위한 파라미터 세팅
        GoogleOAuthRequest googleOAuthRequestParam = GoogleOAuthRequest
                .builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .code(authCode)
                .redirectUri("http://localhost:8080/member/google/auth")
                .grantType("authorization_code").build();


        //JSON 파싱을 위한 기본값 세팅
        //요청시 파라미터는 스네이크 케이스로 세팅되므로 Object mapper에 미리 설정해준다.
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        //AccessToken 발급 요청
        ResponseEntity<String> resultEntity = restTemplate.postForEntity(GOOGLE_TOKEN_BASE_URL, googleOAuthRequestParam, String.class);

        //Token Request
        GoogleOAuthResponse result = mapper.readValue(resultEntity.getBody(), new TypeReference<GoogleOAuthResponse>() {
        });

        //ID Token만 추출 (사용자의 정보는 jwt로 인코딩 되어있다)
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

        //HTTP Request를 위한 RestTemplate
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

//        String redirect_uri = request.getScheme() + "://" +   // "http" + "://
//                request.getServerName() +       // "myhost"
//                ":" + request.getServerPort(); // ":" + "8080"
//        try{
//            response.sendRedirect(redirect_uri);
//        }catch (Exception exception){
//
//        }
        //
        return "success?";
    }

    @PostMapping(value="/logout")
    public ResultMVO logout(HttpServletRequest request) {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        try {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();   // 세션 날림
            }
        } catch (Exception e) {
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
            LOGGER.error("logout error {}", e.toString());
        }

    
        return resultMVO;
    }

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
    //              // 로그인 성공 처리
    //             HttpSession session = request.getSession();                         // 세션이 있으면 있는 세션 반환, 없으면 신규 세션을 생성하여 반환
    //             session.setAttribute(SessionCodeUtil.LOGIN_MEMBER, member.getMemberId());   // 세션에 로그인 회원 정보 보관
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

        try{
            // reissue
            TokenDTO tokenInfo =  memberService.reissue(tokenRequestDTO);
            resultMVO.setTokenInfo(tokenInfo);

            // anonymous issue. 멤버 아이디 설정 값이 익명으로 나오는 문제. 해결을 위해 아래 코드 주석 처리.
//            resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));

            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenInfo.getAccessToken());
        }catch (RuntimeException runtimeException){
            LOGGER.debug("invalid refresh token");
            LOGGER.error("REFRESH TOKEN ERROR : {}", runtimeException.getMessage());
            LOGGER.error("REFRESH TOKEN ERROR : {}", runtimeException.toString());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_INVALID_REFRESH_TOKEN);
            return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.UNAUTHORIZED);
        }catch(Exception exception){
            LOGGER.error("unexpected exception occured");
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
            return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<ResultMVO> authorize(@Valid @RequestBody MemberDTO memberDTO, HttpServletRequest request) throws Exception {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        HttpHeaders httpHeaders = new HttpHeaders();




        try{
            TokenDTO tokenInfo =  memberService.idPwdLogin(request, memberDTO);
            resultMVO.setTokenInfo(tokenInfo);
            resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenInfo.getAccessToken());
            return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
        }catch(DeletedUserException e){
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_DELETED_USER);
            resultMVO.setMessage(e.getMessage());
            return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("login : unexpected error occured : {}", e.getMessage());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
            return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
        }
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

        // 세션에 공개키의 문자열을 키로하여 개인키를 저장한다.
        session.setAttribute("__rsaPrivateKey__", privateKey);
        // 공개키를 문자열로 변환하여 JavaScript RSA 라이브러리 넘겨준다.
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
    public ResultMVO simpleSignUp(@PathVariable("snsName") String snsName, @RequestBody SnsAuthenticate snsAuthenticate){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        String email="";
        if(Arrays.asList(CommonCodeUtil.supportSNSarr).contains(snsName) == false){
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_UNSUPPORT_SNS);
            resultMVO.setMessage("unsupported sns");
        }else{
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setName(snsAuthenticate.getName());
            if(StringUtils.equals(snsName,"google")){
                try{
                    email = memberService.googleAuthServerAuthenticate(snsAuthenticate.getTokenId());
                    memberDTO.setMemberId(email); // 멤버 아이디로 이메일 설정.
                }catch (Exception e){
                    LOGGER.error("googleAuthServerAuthenticate error {}",e.getMessage());
                    resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SNS_AUTH_SERVER_FAIL);
                    return resultMVO;
                }
            }
            try{
                MemberDTO memberInfo =memberService.simplesignup(memberDTO, snsName,email);
            }catch (DuplicateMemberException e) {
                LOGGER.error("signup error : {}", e.toString());
                resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_DUPLICATE_MEMBER);
                resultMVO.setMessage("signup fail. duplicate error");
            }catch (DuplicateLinkedEmailException e){
                LOGGER.error("linkAccount error {}",e.getMessage());
                resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_DUPLICATE_SNS_EMAIL);
                resultMVO.setMessage(e.getMessage());
            }catch (Exception e){
                LOGGER.error("simplesignup error {}",e.getMessage());
                resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
                return resultMVO;
            }

            // spring security Oauth2 Authentication and create access and refreshtoken
            TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(memberService.springSecurityOauth2Authenticate(memberDTO.getMemberId()));
            resultMVO.setTokenInfo(tokenInfo);

            // refresh token 수정.
            memberService.updateRefreshToken(memberDTO.getMemberId(),tokenInfo.getRefreshToken());

            // memberId
            resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));

        }
        return resultMVO;
    }


    @DeleteMapping(value="/withdrawal")
    public ResultMVO withdrawal(){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        MemberDTO memberDTO = memberService.getMyUserWithAuthorities();
        try{
            memberService.withdrawal(memberDTO.getMemberSerialNumber());
        }catch(Exception e){
            LOGGER.error("withdrawal error {}",e.getMessage());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
        }
        return resultMVO;
    }

    @PatchMapping(value="/linkaccount/{snsName}")
    public ResultMVO linkAccount(@PathVariable("snsName") String snsName, @RequestBody SnsAuthenticate snsAuthenticate){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        String email="";
        MemberDTO memberDTO = new MemberDTO();
        if(Arrays.asList(CommonCodeUtil.supportSNSarr).contains(snsName) == false){
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_UNSUPPORT_SNS);
            resultMVO.setMessage("unsupported sns");
        }else{
            if(StringUtils.equals(snsName,"google")){
                try{
                    email = memberService.googleAuthServerAuthenticate(snsAuthenticate.getTokenId());
                }catch (Exception e){
                    LOGGER.error("googleAuthServerAuthenticate error {}",e.getMessage());
                    resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SNS_AUTH_SERVER_FAIL);
                    return resultMVO;
                }
            }
            try{
                memberDTO = memberService.getMyUserWithAuthorities();
                memberService.linkAccount(memberDTO, snsName,email);
            }catch (DuplicateLinkedEmailException e){
                LOGGER.error("linkAccount error {}",e.getMessage());
                resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_DUPLICATE_SNS_EMAIL);
                resultMVO.setMessage(e.getMessage());
            }
            catch (Exception e){
                LOGGER.error("linkAccount error {}",e.getMessage());
                resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
                return resultMVO;
            }

            // spring security Oauth2 Authentication and create access and refreshtoken
            TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(memberService.springSecurityOauth2Authenticate(memberDTO.getMemberId()));
            resultMVO.setTokenInfo(tokenInfo);

            // refresh token 수정.
            memberService.updateRefreshToken(memberDTO.getMemberId(),tokenInfo.getRefreshToken());

            // memberId
            resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));

        }
        return resultMVO;
    }

    @PostMapping(value="/snslogin/{snsName}")
    public ResponseEntity<ResultMVO>  snslogin(@PathVariable("snsName") String snsName, @RequestBody SnsAuthenticate snsAuthenticate){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        String email="";
        HttpHeaders httpHeaders = new HttpHeaders();
        MemberDTO memberInfo;

        if(Arrays.asList(CommonCodeUtil.supportSNSarr).contains(snsName) == false){
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_UNSUPPORT_SNS);
            resultMVO.setMessage("unsupported sns");
        }else{
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setName(snsAuthenticate.getName());
            if(StringUtils.equals(snsName,"google")){
                try{
                    email = memberService.googleAuthServerAuthenticate(snsAuthenticate.getTokenId());
                }catch (Exception e){
                    LOGGER.error("googleAuthServerAuthenticate error {}",e.getMessage());
                    resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SNS_AUTH_SERVER_FAIL);
                    return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
                }
            }
            try{

                memberInfo = memberService.snslogin(email);
                // spring security Oauth2 Authentication and create access and refreshtoken
                TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(memberService.springSecurityOauth2Authenticate(memberInfo.getMemberId()));
                resultMVO.setTokenInfo(tokenInfo);

                // refresh token 수정.
                memberService.updateRefreshToken(memberDTO.getMemberId(),tokenInfo.getRefreshToken());

                // memberId
                resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
                httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenInfo.getAccessToken());

            }catch (NoLinkedMemberException e) {
                LOGGER.error("snslogin error : {}", e.toString());
                resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_NO_LINKED_MEMBER);
                resultMVO.setMessage("snslogin fail. no linked member ");
            }catch (Exception e){
                LOGGER.error("snslogin error {}",e.getMessage());
                resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
                return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
            }

        }

        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.OK);
    }

    @PostMapping(value = "/signup")
    public ResultMVO signup(@RequestBody MemberDTO memberDTO, HttpServletRequest request){
        ResultMVO resultMVO = new ResultMVO();

        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        try {
            TokenDTO tokenInfo =memberService.signup(request, memberDTO);
            resultMVO.setTokenInfo(tokenInfo);

            // memberId
            resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));

        } catch (DuplicateMemberException e) {
            LOGGER.error("signup error : {}", e.toString());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_DUPLICATE_MEMBER);
            resultMVO.setMessage("signup fail. duplicate error");
        } catch (ValidateException e) {
            LOGGER.error("validate error : {}", e.toString());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_ID_PASSWORD_VALID_FAIL);
            resultMVO.setMessage(e.getMessage());
        } catch (Exception e) {
            LOGGER.error("signup error : {}", e.toString());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
            resultMVO.setMessage("signup fail.. server error");
        }
        return resultMVO;
    }


    // @PostMapping("/signup")
    // public ResponseEntity<User> signup(
    //         @Valid @RequestBody UserDto userDto
    // ) {
    //     return ResponseEntity.ok(userService.signup(userDto));
    // }

    @GetMapping("/currentUser")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public String getMyUserInfo(HttpServletRequest request) {
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);
        try {
            MemberDTO memberDTO =memberService.getMyUserWithAuthorities();
            MemberInfo memberInfo = modelMapper.map(memberDTO,MemberInfo.class);
            jo.add("memberInfo", new Gson().toJsonTree(memberInfo));
        } catch (Exception e) {
            LOGGER.error("getMyUserInfo error : {}", e.toString());
            jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_FAIL);
            jo.addProperty("message", "server error");
        }
        return jo.toString();
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<MemberDTO> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(memberService.getUserWithAuthorities(username));
    }
    
}
