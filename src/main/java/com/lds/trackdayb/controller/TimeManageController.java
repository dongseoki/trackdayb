package com.lds.trackdayb.controller;

import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.service.TestService;
import com.lds.trackdayb.service.TimeManageService;
import com.lds.trackdayb.vo.TimeRecordVO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @PostMapping("/createTimeRecord")
    public String createTimeRecord(@RequestBody TimeRecordVO timeRecordVO){
        // FIXME 로그인 아이디 조회.
        int loginSerialNumber = testService.selectLoginMemberSerialNumber();
//        TimeRecordVO vo = new TimeRecordVO();
//        timeManageService.createTimeRecord(vo);
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        timeManageService.createTimeRecord(timeRecordVO);
        return "시간관리 - 기록하기 - 시간기록 삽입";
    }

    @GetMapping("/viewTimeRecord")
    public TimeRecordMVO viewTimeRecord(@RequestParam("selectionDate") String selectionDate){
        // FIXME 로그인 아이디 조회.
        int loginSerialNumber = testService.selectLoginMemberSerialNumber();

        TimeRecordVO vo = new TimeRecordVO();
        vo.setMemberSerialNumber(loginSerialNumber);
        vo.setSelectionDate(selectionDate);
        return timeManageService.selectTimeRecord(vo);
    }

    @PostMapping("/modifyTimeRecord")
    public TimeRecordMVO modifyTimeRecord(@RequestBody TimeRecordVO timeRecordVO){
        // FIXME 로그인 아이디 조회.
        int loginSerialNumber = testService.selectLoginMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
//        timeRecordVO.setTimeRecordId(timeRecordVO.getTimeRecordId());
        return timeManageService.modifyTimeRecord(timeRecordVO);
    }
    @PostMapping("/deleteTimeRecord")
    public TimeRecordMVO deleteTimeRecord(@RequestBody TimeRecordVO timeRecordVO){
        // FIXME 로그인 아이디 조회.
        int loginSerialNumber = testService.selectLoginMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
//        TimeRecordVO timeRecordVO = new TimeRecordVO();
//        timeRecordVO.setTimeRecordId(timeRecordVO);
        return timeManageService.deleteTimeRecord(timeRecordVO);
    }

}
