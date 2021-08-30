package com.lds.trackdayb.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public String hello(){
        Date date = new Date();
        return "안녕하세요. 현재 서버시간은 "+date +"입니다. \n";
// 출처: https://sundries-in-myidea.tistory.com/71 [얇고 넓은 개발 블로그] 
    }
}
