package com.lds.trackdayb.controller;

import com.lds.trackdayb.dto.ClassificationDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDefaultSettingDTO;
import com.lds.trackdayb.mvo.ReferenceFavoriteMVO;
import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.service.SystemManageService;
import com.lds.trackdayb.service.TestService;
import com.lds.trackdayb.service.TimeManageService;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.vo.TimeRecordVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);

    

    @GetMapping("/record")
    public String recordPage(@RequestParam("selectionDate") @Nullable String selectionDate, @RequestParam("referenceName") @Nullable String referenceName, ModelMap model){
    // public String recordPage(){
        // 필요 없을듯..?
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();

        // TODO 날짜의 유효성 검사? 고려 필요.
        // 

        // TODO 
        List<ReferenceFavoriteMVO> referenceFavoriteList = systemManageService.viewReferenceFavoriteList(CommonCodeUtil.TIME_RECORD, CommonCodeUtil.TIME_UNIT_DAY, loginSerialNumber);

        // TODO
        ReferenceFavoriteDefaultSettingDTO referenceFavoriteDefaultSetting = systemManageService.viewReferenceFavoriteDefaultSetting(CommonCodeUtil.TIME_RECORD, CommonCodeUtil.TIME_UNIT_DAY, loginSerialNumber);

        // TODO
        List<ClassificationDTO> classificationList =  systemManageService.viewClassificationList(CommonCodeUtil.TIME_RECORD, CommonCodeUtil.TIME_UNIT_DAY, loginSerialNumber);
        
        if(selectionDate == null || "".equals(selectionDate)){
            SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd");   
            Date time = new Date();
            selectionDate = format1.format(time);
        }

        // FIXME  LOGGER TEST
        LOGGER.info("#### Success 참조 즐겨찾기 기본 설정 : 관리유형 is {}, 참조 즐겨찾기 id is {}", referenceFavoriteDefaultSetting.getManagementType(), referenceFavoriteDefaultSetting.getReferenceFavoriteId());

        model.addAttribute("selectionDate", selectionDate);
        model.addAttribute("referenceFavoriteList", referenceFavoriteList);
        model.addAttribute("referenceFavoriteDefaultSetting", referenceFavoriteDefaultSetting);
        model.addAttribute("classificationList", classificationList);
        return "/timeManage/record";
    }

//    @PostMapping("/createTimeRecord")

    @PostMapping("/createTimeRecord")
    @ResponseBody
    public String createTimeRecord(@RequestBody TimeRecordVO timeRecordVO){
        // FIXME 로그인 아이디 조회.
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        timeManageService.createTimeRecord(timeRecordVO);
        return "시간관리 - 기록하기 - 시간기록 삽입";
    }

    @GetMapping("/viewTimeRecord")
    public String viewTimeRecord(@RequestParam("selectionDate") @Nullable String selectionDate, ModelMap model){
        // FIXME 로그인 아이디 조회.
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();

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

    @GetMapping("/viewTimeRecordRegist")
    public String viewTimeRecordRegist(@RequestParam("selectionDate") @Nullable String selectionDate, ModelMap model){
        // FIXME 로그인 아이디 조회.
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();

        TimeRecordVO vo = new TimeRecordVO();
        vo.setMemberSerialNumber(loginSerialNumber);
        vo.setSelectionDate(selectionDate);
        TimeRecordMVO timeRecord = timeManageService.selectTimeRecord(vo);
        if(timeRecord == null){
            timeRecord = new TimeRecordMVO();
            timeRecord.setSelectionDate(selectionDate);
        }

        model.addAttribute("timeRecord", timeRecord);
        return "/timeManage/timeRecordRegistView";
    }

    @PostMapping("/viewTimeRecordList")
    // public String viewTimeRecordList(List<String> selectedDateList){
    public String viewTimeRecordList(TimeRecordVO timeRecordVO,ModelMap model){
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);

        // FIXME 
        LOGGER.info("TEST VO : {}", timeRecordVO.getSelectedDateList().toString());

        List<String> selectedDateList = timeRecordVO.getSelectedDateList();
        List<TimeRecordMVO> timeRecordList = timeManageService.selectTimeRecordList(timeRecordVO.getSelectedDateList(), loginSerialNumber);

        model.addAttribute("timeRecordList", timeRecordList);
        model.addAttribute("selectedDateList", selectedDateList);
        // FIXME 임시.
        // return "/timeManage/timeRecordView";
        return "/timeManage/timeRecordListView";
    }


    @PostMapping("/modifyTimeRecord")
    @ResponseBody
    public TimeRecordMVO modifyTimeRecord(@RequestBody TimeRecordVO timeRecordVO){
        // TODO  로그인 아이디 조회.
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        return timeManageService.modifyTimeRecord(timeRecordVO);
    }

    @PostMapping("/deleteTimeRecord")
    @ResponseBody
    public TimeRecordMVO deleteTimeRecord(@Valid @RequestBody TimeRecordVO timeRecordVO, BindingResult bindingResult, ModelMap model){
        // TODO  로그인 아이디 조회.
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        return timeManageService.deleteTimeRecord(timeRecordVO);
    }

}
