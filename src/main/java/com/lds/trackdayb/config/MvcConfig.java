package com.lds.trackdayb.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class MvcConfig implements WebMvcConfigurer{

    // 요청 - 뷰 연결.
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/timeManage/recordPubl").setViewName("/timeManage/recordPubl");
    registry.addViewController("/{spring:\\w+}")
        .setViewName("forward:/");
    registry.addViewController("/**/{spring:\\w+}")
        .setViewName("forward:/");
  }
}
