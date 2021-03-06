package com.lds.trackdayb.config;

import com.lds.trackdayb.bean.LoginInterceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class MvcConfig implements WebMvcConfigurer{
  // @Autowired
  // LoginInterceptor loginInterceptor;

    // 요청 - 뷰 연결.
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/timeManage/recordPubl").setViewName("/timeManage/recordPubl");
    // registry.addView
    ///timeManage/record
    registry.addViewController("/{spring:\\w+}")
        .setViewName("forward:/");
    registry.addViewController("/**/{spring:\\w+}")
        .setViewName("forward:/");
  }

  // 로그인 인터셉터를 이용할 경우 사용.
  // @Override
  // public void addInterceptors(InterceptorRegistry registry) {
  //     registry.addInterceptor(loginInterceptor)
  //             .excludePathPatterns("/post/page")
  //             .addPathPatterns("/timeManage/**")
  //             .addPathPatterns("/goalManage/**");
  // }
    
}
