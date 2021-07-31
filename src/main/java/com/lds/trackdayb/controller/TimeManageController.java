package com.lds.trackdayb.controller;

import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.service.SystemManageService;
import com.lds.trackdayb.service.TestService;
import com.lds.trackdayb.service.TimeManageService;
import com.lds.trackdayb.vo.TimeRecordVO;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

//@RestController
@RequiredArgsConstructor
@Controller
@RequestMapping("/timeManage")
public class TimeManageController {
    private  final TestService testService;
    private final TimeManageService timeManageService;
    private final SystemManageService systemManageService;

    

    @GetMapping("/record")
    public String recordPage(@RequestParam("selectionDate") @Nullable String selectionDate, @RequestParam("referenceName") @Nullable String referenceName, ModelMap model){
    // public String recordPage(){
        // 필요 없을듯..?
        int loginSerialNumber = testService.selectLoginMemberSerialNumber();

        // TODO 날짜의 유효성 검사? 고려 필요.
        // 

        // TODO 
        // systemManageService.viewReferenceFavoriteList(selectionDate);

        // TODO
        // systemManageService.viewReferenceFavoriteDefaultSetting(selectionDate);

        // TODO
        // systemManageService.viewClassificationList()
        if(selectionDate == null || "".equals(selectionDate)){
            SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd");   
            Date time = new Date();
            selectionDate = format1.format(time);
        }

        model.addAttribute("selectionDate", selectionDate);
        return "/timeManage/record";
    }

//    @PostMapping("/createTimeRecord")

    @PostMapping("/createTimeRecord")
    @ResponseBody
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
    public String viewTimeRecord(@RequestParam("selectionDate") @Nullable String selectionDate, ModelMap model){
        // FIXME 로그인 아이디 조회.
        int loginSerialNumber = testService.selectLoginMemberSerialNumber();

        TimeRecordVO vo = new TimeRecordVO();
        vo.setMemberSerialNumber(loginSerialNumber);
        vo.setSelectionDate(selectionDate);
        TimeRecordMVO timeRecord = timeManageService.selectTimeRecord(vo);
        if(timeRecord == null){
            timeRecord = new TimeRecordMVO();
            timeRecord.setSelectionDate(selectionDate);
        }

        model.addAttribute("timeRecord", timeRecord);
        return "/timeManage/timeRecordView";
    }

    @PostMapping("/modifyTimeRecord")
    @ResponseBody
    public TimeRecordMVO modifyTimeRecord(@RequestBody TimeRecordVO timeRecordVO){
        // TODO  로그인 아이디 조회.
        int loginSerialNumber = testService.selectLoginMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        return timeManageService.modifyTimeRecord(timeRecordVO);
    }

    @PostMapping("/deleteTimeRecord")
    @ResponseBody
    public TimeRecordMVO deleteTimeRecord(@Valid @RequestBody TimeRecordVO timeRecordVO, BindingResult bindingResult, ModelMap model){
        // TODO  로그인 아이디 조회.
        int loginSerialNumber = testService.selectLoginMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        return timeManageService.deleteTimeRecord(timeRecordVO);
    }

}
