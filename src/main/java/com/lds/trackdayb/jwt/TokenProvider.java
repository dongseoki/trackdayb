package com.lds.trackdayb.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import com.lds.trackdayb.dto.TokenDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenProvider implements InitializingBean {

   private final Logger LOGGER = LoggerFactory.getLogger(TokenProvider.class);

   private static final String AUTHORITIES_KEY = "auth";
   private static final String BEARER_TYPE = "bearer";

   private final String secret;
   private final long accessTokenValidityInMilliseconds;
   private final long refreshTokenValidityInMilliseconds;

   private Key key;


   // application yml 에 있는 jwt 설정 정보를 생성자의 인자로 넘긴다.
   public TokenProvider(
      @Value("${jwt.secret}") String secret,
      @Value("${jwt.access-token-validity-in-seconds}") long accessTokenValidityInSeconds,
      @Value("${jwt.refresh-token-validity-in-seconds}") long refreshTokenValidityInSeconds) {
      this.secret = secret;
      this.accessTokenValidityInMilliseconds = accessTokenValidityInSeconds * 1000;
      this.refreshTokenValidityInMilliseconds = refreshTokenValidityInSeconds * 1000;
   }

   @Override
   public void afterPropertiesSet() {
      byte[] keyBytes = Decoders.BASE64.decode(secret);
      this.key = Keys.hmacShaKeyFor(keyBytes);
   }

   // 인증정보를 기반으로 토큰을 생성한다.
   public TokenDTO createAccessAndRefreshToken(Authentication authentication) {
      String authorities = authentication.getAuthorities().stream()
         .map(GrantedAuthority::getAuthority)
         .collect(Collectors.joining(","));

      long now = (new Date()).getTime();

      // Access Token 생성
      Date accessTokenExpiresIn = new Date(now + this.accessTokenValidityInMilliseconds);
      String accessToken = Jwts.builder()
              .setSubject(authentication.getName())       // payload "sub": "name"
              .claim(AUTHORITIES_KEY, authorities)        // payload "auth": "ROLE_USER"
              .setExpiration(accessTokenExpiresIn)        // payload "exp": 1516239022 (예시)
              .signWith(key, SignatureAlgorithm.HS512)    // header "alg": "HS512"
              .compact();

      // Refresh Token 생성
      Date refreshTokenExpiresIn = new Date(now + this.refreshTokenValidityInMilliseconds);
      String refreshToken = Jwts.builder()
              .setExpiration(refreshTokenExpiresIn)
              .signWith(key, SignatureAlgorithm.HS512)
              .compact();

      LOGGER.debug("createToken Info");
      LOGGER.debug("accessTokenExpiresIn : {}", accessTokenExpiresIn);
      LOGGER.debug("refreshTokenTokenExpiresIn : {}", refreshTokenExpiresIn);


      return  TokenDTO.builder()
              .grantType(BEARER_TYPE)
              .accessToken(accessToken)
              .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
              .refreshToken(refreshToken)
              .build();
   }

   // 인증정보를 기반으로 토큰을 생성한다.
   public TokenDTO createAccessTokenOnly(Authentication authentication) {
      String authorities = authentication.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.joining(","));

      long now = (new Date()).getTime();

      // Access Token 생성
      Date accessTokenExpiresIn = new Date(now + this.accessTokenValidityInMilliseconds);
      String accessToken = Jwts.builder()
              .setSubject(authentication.getName())       // payload "sub": "name"
              .claim(AUTHORITIES_KEY, authorities)        // payload "auth": "ROLE_USER"
              .setExpiration(accessTokenExpiresIn)        // payload "exp": 1516239022 (예시)
              .signWith(key, SignatureAlgorithm.HS512)    // header "alg": "HS512"
              .compact();

      LOGGER.debug("createToken Info");
      LOGGER.debug("accessTokenExpiresIn : {}", accessTokenExpiresIn);


      return  TokenDTO.builder()
              .grantType(BEARER_TYPE)
              .accessToken(accessToken)
              .accessTokenExpiresIn(accessTokenExpiresIn.getTime())
              .build();
   }


   // 토큰을 이용하여, 권한 객체를 반환한다.
   // 권한 객체는 무엇인가?
   public Authentication getAuthentication(String token) {

      Claims claims = parseClaims(token);
//      Claims claims = Jwts
//              .parserBuilder()
//              .setSigningKey(key)
//              .build()
//              .parseClaimsJws(token)
//              .getBody();

      Collection<? extends GrantedAuthority> authorities =
         Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());

      User principal = new User(claims.getSubject(), "", authorities);

      return new UsernamePasswordAuthenticationToken(principal, token, authorities);
   }

   // 토큰과 가지고 있던 키값을 이용하여, 유효성을 검증한다.
   public boolean validateToken(String token) {
      try {
         LOGGER.info("토큰 값 확인 : {}", token);
         Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
         return true;
      } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
         LOGGER.info("잘못된 JWT 서명입니다.");
      } catch (ExpiredJwtException e) {
         LOGGER.info("만료된 JWT 토큰입니다.");
      } catch (UnsupportedJwtException e) {
         LOGGER.info("지원되지 않는 JWT 토큰입니다.");
      } catch (IllegalArgumentException e) {
         LOGGER.info("JWT 토큰이 잘못되었습니다.");
      }
      return false;
   }

   // 유효기간 만료 Exception만 따로 처리.
   private Claims parseClaims(String token) {
      try {
         return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
      } catch (ExpiredJwtException e) {
         return e.getClaims();
      }
   }
}
