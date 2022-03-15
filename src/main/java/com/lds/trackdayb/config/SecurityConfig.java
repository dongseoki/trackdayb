package com.lds.trackdayb.config;

import com.lds.trackdayb.jwt.JwtAccessDeniedHandler;
import com.lds.trackdayb.jwt.JwtAuthenticationEntryPoint;
import com.lds.trackdayb.jwt.JwtSecurityConfig;
import com.lds.trackdayb.jwt.TokenProvider;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
// @preAuthorize 어노테이션을 메소드 단위로 추가하기 위해서 적용.
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final TokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(TokenProvider tokenProvider, CorsFilter corsFilter,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    // 패스워드 단방향 암호화를 위해 사용.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // token을 사용하는 방식이기 때문에 csrf를 disable합니다.
                .csrf().disable()

                // corsFilter에 대해
                // 서블릿 필터 인터페이스를 이용하여 개발되었다. 웹 서버의 모든 리소스의 요청을 가로채서 Cross-Domain 요청 인지를 체크하여 실제
                // 요청 페이지에 전달하기전에 적절한 CORS 정책과 해더들을 적용한다.

                // 서블릿 필터 방식이기 때문에 기존의 웹 서비스에 수정없이 쉽게 적용 할 수 있다. CORS jar 파일만 클래스패스 상에 복사하고
                // web.xml에서 서블릿 필터 설정만 하면된다.
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling()
                // 인증 실패
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                // 인가 (권한) 실패.
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세션을 사용하지 않기 때문에 STATELESS로 설정
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and().authorizeRequests()

                // no jwt test code.
                // 테스트 시 아래 [1]번 주석을 풀고, 하단 [2]번을 주석처리 하시면 됩니다.
                // 테스트 완료 후 원상복구 하면 됩니다.
                // [1]
                // .antMatchers("/**").permitAll()
                // [1] end.
                // [2]
//                .antMatchers("/time*","/goal*", "/report*", "/community*", "/login*", "/signup*").permitAll()
                .antMatchers("/report*", "/community*", "/login*", "/signup*").permitAll()
                .antMatchers("/index*", "/static/**", "/*.js", "/*.json", "/*.ico","/*.txt").permitAll()
                .antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html", "/**/*.css", "/**/*.js").permitAll()
                .antMatchers("/rest-test/**").permitAll()
                .antMatchers("/test","/testPage","/test/**").permitAll()
                .antMatchers("/member/login","/member/loginTest","/member/signup","/member/reissue").permitAll()
                .antMatchers("/member/requestpublickey").permitAll()
                .antMatchers("/member/google/auth","/member/google/tokensignin").permitAll()
                .antMatchers("/member/snslogin/**","/member/simplesignup/**").permitAll()
                // [2] end.

                .anyRequest().authenticated()

                // jwtConfig 설정 적용.
                .and().apply(new JwtSecurityConfig(tokenProvider));

    }
}
