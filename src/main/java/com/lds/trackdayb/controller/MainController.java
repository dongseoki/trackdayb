package com.lds.trackdayb.controller;

import com.lds.trackdayb.service.MainService;
import com.lds.trackdayb.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/main")
public class MainController {
    private  final MainService mainService;
    private  final TestService testService;

    public MainController(MainService mainService, TestService testService) {
        this.mainService = mainService;
        this.testService = testService;
    }

    @GetMapping("/main")
    public String enterMain(){
        return mainService.enterMain();
    }
}
