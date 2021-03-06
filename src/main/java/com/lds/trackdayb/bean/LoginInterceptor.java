package com.lds.trackdayb.bean;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.util.SessionCodeUtil;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


// test
// @Component
// 더이상 사용하지 않는 클레스.(이전에 스프링 세큐리티 없이 로그인을 구현할때 사용함.)
public class LoginInterceptor implements HandlerInterceptor{
    static final Logger LOGGER = LoggerFactory.getLogger(LoginInterceptor.class);
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {


        HttpSession httpSession = request.getSession();
        String sessionItem = (String)httpSession.getAttribute(SessionCodeUtil.LOGIN_MEMBER);
        LOGGER.info("LoginInterceptor sessionItem Info : {}", StringUtils.defaultString(sessionItem));

        if(sessionItem == null){
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            ResultMVO resultMVO = new ResultMVO();
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_ACCESS_AUTH_FAIL);


            String result = objectMapper.writeValueAsString(resultMVO);
            response.getWriter().write(result);
            // response.getOutputStream().println("LOGIN REQUIRED!");
            return false;
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}