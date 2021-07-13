package com.lds.trackdayb.controller;

import com.lds.trackdayb.service.TestService;
import com.lds.trackdayb.service.TimeManageService;
import com.lds.trackdayb.vo.TimeRecordVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/timeManage")
public class TimeManageController {
    private  final TestService testService;
    private final TimeManageService timeManageService;

    public TimeManageController(TestService testService, TimeManageService timeManageService) {
        this.testService = testService;
        this.timeManageService = timeManageService;
    }

    @GetMapping("/record")
    public String recordPage(){
        // TODO 로그인 아이디 조회

        return "시간관리 - 기록하기 - 페이지 접근(틀잡기)";
    }

//    @PostMapping("/createTimeRecord")
    @GetMapping("/createTimeRecord")
    public String createTimeRecord(){
        // FIXME 로그인 아이디 조회.
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        TimeRecordVO vo = new TimeRecordVO();
        timeManageService.createTimeRecord(vo);
        return "시간관리 - 기록하기 - 시간기록 삽입";
    }

}
