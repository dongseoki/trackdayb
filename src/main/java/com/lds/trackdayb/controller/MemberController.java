package com.lds.trackdayb.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.lds.trackdayb.dto.MemberDTO;
import com.lds.trackdayb.dto.TokenDTO;
import com.lds.trackdayb.dto.TokenRequestDTO;
import com.lds.trackdayb.exception.DuplicateMemberException;
import com.lds.trackdayb.exception.ValidateException;
import com.lds.trackdayb.jwt.JwtFilter;
import com.lds.trackdayb.jwt.TokenProvider;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.service.MemberService;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.util.SecurityUtil;

import ognl.Token;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/member")
public class MemberController {    
    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);


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
    public ResponseEntity<ResultMVO> authorize(@Valid @RequestBody MemberDTO memberDTO) {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        UsernamePasswordAuthenticationToken authenticationToken;
        Authentication authentication;
        HttpHeaders httpHeaders;


        authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO.getUsername(), memberDTO.getPassword());

        authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(authentication);
        resultMVO.setTokenInfo(tokenInfo);

        // refresh token 수정.
        memberService.updateRefreshToken(memberDTO.getMemberId(),tokenInfo.getRefreshToken());

        resultMVO.setMemberId(SecurityUtil.getCurrentUsername().orElse(null));
        httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + tokenInfo.getAccessToken());

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

    @PostMapping(value = "/signup")
    public ResultMVO signup(@RequestBody MemberDTO memberDTO){
        ResultMVO resultMVO = new ResultMVO();
        String originalPassword = memberDTO.getPassword();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        try {
            MemberDTO memberInfo =memberService.signup(memberDTO);

            //로그인 처리.
            UsernamePasswordAuthenticationToken authenticationToken;
            Authentication authentication;
            String jwt="";
            authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO.getUsername(), originalPassword);

            authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
    
            // jwt 토큰.
            TokenDTO tokenInfo = tokenProvider.createAccessAndRefreshToken(authentication);
            resultMVO.setTokenInfo(tokenInfo);

            // refresh token 수정.
            memberService.updateRefreshToken(memberDTO.getMemberId(),tokenInfo.getRefreshToken());
            
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
            MemberDTO memberInfo =memberService.getMyUserWithAuthorities();
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
