package com.lds.trackdayb.controller;

import com.lds.trackdayb.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class TestController {
    @Autowired
    private TestService testService;

    @GetMapping("/v1/board")
    public List<Map<String, Object>> getCitys() {
        return testService.getCitys();
    }
}
