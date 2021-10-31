package com.lds.trackdayb.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.lds.trackdayb.dto.MemberDTO;
import com.lds.trackdayb.dto.TokenDTO;
import com.lds.trackdayb.exception.DuplicateMemberException;
import com.lds.trackdayb.jwt.JwtFilter;
import com.lds.trackdayb.jwt.TokenProvider;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.service.MemberService;
import com.lds.trackdayb.util.ResponseCodeUtil;

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

    @PostMapping("/login")
    public ResponseEntity<ResultMVO> authorize(@Valid @RequestBody MemberDTO memberDTO) {
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        UsernamePasswordAuthenticationToken authenticationToken;
        Authentication authentication;
        String jwt="";
        HttpHeaders httpHeaders;


        authenticationToken =
        new UsernamePasswordAuthenticationToken(memberDTO.getUsername(), memberDTO.getPassword());

        authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        jwt = tokenProvider.createToken(authentication);
        resultMVO.setToken(jwt);

        httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

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
    public String signup(@RequestBody MemberDTO memberDTO){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);
        try {
            MemberDTO memberInfo =memberService.signup(memberDTO);
            jo.addProperty("memberId", memberInfo.getMemberId());
        } catch (DuplicateMemberException e) {
            LOGGER.error("signup error : {}", e.toString());
            jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_DUPLICATE_MEMBER);
            jo.addProperty("message", "signup fail. duplicate error");
        } catch (Exception e) {
            LOGGER.error("signup error : {}", e.toString());
            jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_FAIL);
            jo.addProperty("message", "signup fail. server error");
        }
        return jo.toString();
    }


    // @PostMapping("/signup")
    // public ResponseEntity<User> signup(
    //         @Valid @RequestBody UserDto userDto
    // ) {
    //     return ResponseEntity.ok(userService.signup(userDto));
    // }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<MemberDTO> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(memberService.getMyUserWithAuthorities());
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<MemberDTO> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(memberService.getUserWithAuthorities(username));
    }
    
}
