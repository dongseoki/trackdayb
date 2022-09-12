package com.lds.trackdayb.jwt;

import java.io.IOException;

import javax.security.auth.message.AuthException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
 
    public static final String AUTHORIZATION_HEADER = "Authorization";
 
    private TokenProvider tokenProvider;
 
    public JwtFilter(TokenProvider tokenProvider) {
       this.tokenProvider = tokenProvider;
    }
 

    // do filter는 
    // 적절한 인증 절차를 걸쳐서, 
    // 인증정보 authentication을 SecurityContextHolder에 저장하는 역할을 한다.
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
       throws IOException, ServletException{
       HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
       String jwt = resolveToken(httpServletRequest);
       String requestURI = httpServletRequest.getRequestURI();
 
       if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
          Authentication authentication = tokenProvider.getAuthentication(jwt);
          SecurityContextHolder.getContext().setAuthentication(authentication);
          logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
       } else {
          logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
       }
 
       filterChain.doFilter(servletRequest, servletResponse);
    }

    // resolove token 의 역할
 // header에서 토큰 정보를 가져오고, 
// 'Bearer'을 제외한 문자열만 반환해주도록 처리해줍니다
    private String resolveToken(HttpServletRequest request) {
       String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
       if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
          return bearerToken.substring(7);
       }
       return null;
    }
 }
 