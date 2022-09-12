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
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);

    @PostMapping("/reissue")
    public ResponseEntity<ResultMVO> reissue(@Valid @RequestBody TokenRequestDTO tokenRequestDTO){
        ResultMVO resultMVO = new ResultMVO();
        HttpHeaders httpHeaders;
        httpHeaders = new HttpHeaders();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        // reissue
        TokenDTO tokenInfo =  memberService.reissue(tokenRequestDTO);
        resultMVO.setTokenInfo(tokenInfo);

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

            // refresh token 수정.
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

        // refresh token 수정.
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

            // refresh token 수정.
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

        // 성공시 변경된 회원정보 반환.
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
