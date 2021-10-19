package com.lds.trackdayb.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.lds.trackdayb.dto.MemberDTO;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.service.MemberService;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.util.SessionCodeUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @PostMapping(value = "/login")
    public ResultMVO login(@RequestBody MemberDTO memberDTO,HttpServletRequest request){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        try {
            MemberDTO member = memberService.login(memberDTO.getMemberId(), memberDTO.getPassword());
            if (member == null){
                resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_LOGIN_FAIL);
                resultMVO.setMessage("please check your id and password");
            }else{
                resultMVO.setMemberId(member.getMemberId());
                 // 로그인 성공 처리
                HttpSession session = request.getSession();                         // 세션이 있으면 있는 세션 반환, 없으면 신규 세션을 생성하여 반환
                session.setAttribute(SessionCodeUtil.LOGIN_MEMBER, member.getMemberId());   // 세션에 로그인 회원 정보 보관
            }
        } catch (Exception e) {
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
            LOGGER.error("login exception", e.toString());
            e.printStackTrace();
        }

        return resultMVO; 
    }

    @PostMapping(value = "/signup")
    public ResultMVO signup(@RequestBody MemberDTO memberDTO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        try {
            memberService.save(memberDTO);
        } catch (Exception e) {
            LOGGER.error("signup error : {}", e.toString());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
            resultMVO.setMessage("signup fail.");
        }

        return resultMVO;
    }
    
}
