package com.lds.trackdayb.jwt;

import java.io.IOException;

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
       throws IOException, ServletException {
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

//  참고자료
//  우리가 궁금해하던 bearer는 위 형식에서 type에 해당합니다. 토큰에는 많은 종류가 있고 서버는 다양한 종류의 토큰을 처리하기 위해 전송받은 type에 따라 토큰을 다르게 처리합니다

// https://velog.io/@cada/%ED%86%A0%EA%B7%BC-%EA%B8%B0%EB%B0%98-%EC%9D%B8%EC%A6%9D%EC%97%90%EC%84%9C-bearer%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C#bearer
    private String resolveToken(HttpServletRequest request) {
       String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
       if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
          return bearerToken.substring(7);
       }
       return null;
    }
 }
 