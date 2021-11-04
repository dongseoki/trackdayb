package com.lds.trackdayb.controller;

import com.lds.trackdayb.repository.GoalManageRepository;
import com.lds.trackdayb.service.TestService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

// @RestController
// public class TestController {
//     @Autowired
//     private TestService testService;

//     @GetMapping("/v1/board")
//     public List<Map<String, Object>> getCitys() {
//         return testService.getCitys();
//     }
// }

@RequiredArgsConstructor
@Controller
@RequestMapping("/test")
public class TestController {
    private final TestService testService;

    @GetMapping("/testPage")
    public String testPage() {
        return "/test/testPage";
    }

    @GetMapping("/testLogoutPage")
    public String testLogoutPage() {
        return "/test/testLogoutPage";
    }

    @GetMapping(value="/login")
    public String loginPage(){
      return "/test/login";
    }

    @GetMapping(value="/signup")
    public String signupPage(){
      return "/test/signup";
    }



}
