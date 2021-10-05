package com.lds.trackdayb.config;

import com.lds.trackdayb.service.MemberService;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
//@EnableWebSecurity
@EnableWebSecurity(debug = true)
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final MemberService memberService;
    @Override
    public void configure(WebSecurity web) { // 4
      web.ignoring().antMatchers("/css/**", "/js/**", "/img/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception { // 5
      http.csrf().disable().authorizeRequests()
      // http.authorizeRequests() // 6
              .antMatchers("/member/login", "/member/signup", "/board/**").permitAll() // 누구나 접근 허용
              .antMatchers("/main/*").hasRole("USER") // USER, ADMIN만 접근 가능
              .antMatchers("/member/admin").hasRole("ADMIN") // ADMIN만 접근 가능
              .anyRequest().authenticated() // 나머지 요청들은 권한의 종류에 상관 없이 권한이 있어야 접근 가능
          .and() 
            .formLogin() // 7
              .loginPage("/member/login") // 로그인 페이지 링크
              .defaultSuccessUrl("/main/main", true) // 로그인 성공 후 리다이렉트 주소
          .and()
            .logout() // 8
              .logoutSuccessUrl("/member/login") // 로그아웃 성공시 리다이렉트 주소
          .invalidateHttpSession(true) // 세션 날리기
      ;
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception { // 9
      auth.userDetailsService(memberService)
          // 해당 서비스(memberService)에서는 UserDetailsService를 implements해서 
          // loadUserByUsername() 구현해야함 (서비스 참고)
          .passwordEncoder(new BCryptPasswordEncoder()); 
     }
}
