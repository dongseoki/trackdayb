package com.lds.trackdayb.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.lds.trackdayb.dto.ClassificationDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDefaultSettingDTO;
import com.lds.trackdayb.mvo.ActivityMVO;
import com.lds.trackdayb.mvo.ReferenceFavoriteMVO;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.service.MemberService;
import com.lds.trackdayb.service.SystemManageService;
import com.lds.trackdayb.service.TestService;
import com.lds.trackdayb.service.TimeManageService;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.vo.ActivityVO;
import com.lds.trackdayb.vo.TimeRecordVO;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
// @Controller
@RequestMapping("/timeManage")
public class TimeManageController {
    private  final TestService testService;
    private final MemberService memberService;
    private final TimeManageService timeManageService;
    private final SystemManageService systemManageService;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);

    

    @GetMapping("/record")
    public String recordPage(@RequestParam("selectionDate") @Nullable String selectionDate, @RequestParam("referenceName") @Nullable String referenceName, ModelMap model){
    // public String recordPage(){
        // ?????? ?????????..?
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();

        // TODO ????????? ????????? ??????? ?????? ??????.
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
        LOGGER.info("#### Success ?????? ???????????? ?????? ?????? : ???????????? is {}, ?????? ???????????? id is {}", referenceFavoriteDefaultSetting.getManagementType(), referenceFavoriteDefaultSetting.getReferenceFavoriteId());

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
        // FIXME ????????? ????????? ??????.
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        timeManageService.createTimeRecord(timeRecordVO);
        return "???????????? - ???????????? - ???????????? ??????";
    }

    @GetMapping("/viewTimeRecord")
    public String viewTimeRecord(@RequestParam("selectionDate") @Nullable String selectionDate, ModelMap model){
        // FIXME ????????? ????????? ??????.
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();

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
        // FIXME ????????? ????????? ??????.
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();

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
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);

        // FIXME 
        LOGGER.info("TEST VO : {}", timeRecordVO.getSelectedDateList().toString());

        List<String> selectedDateList = timeRecordVO.getSelectedDateList();
        List<TimeRecordMVO> timeRecordList = timeManageService.selectTimeRecordList(timeRecordVO.getSelectedDateList(), loginSerialNumber);

        model.addAttribute("timeRecordList", timeRecordList);
        model.addAttribute("selectedDateList", selectedDateList);
        // FIXME ??????.
        // return "/timeManage/timeRecordView";
        return "/timeManage/timeRecordListView";
    }


    @PostMapping("/modifyTimeRecord")
    @ResponseBody
    public TimeRecordMVO modifyTimeRecord(@RequestBody TimeRecordVO timeRecordVO){
        // TODO  ????????? ????????? ??????.
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        return timeManageService.modifyTimeRecord(timeRecordVO);
    }

    @PostMapping("/deleteTimeRecord")
    @ResponseBody
    public TimeRecordMVO deleteTimeRecord(@Valid @RequestBody TimeRecordVO timeRecordVO, BindingResult bindingResult, ModelMap model){
        // TODO  ????????? ????????? ??????.
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        timeRecordVO.setMemberSerialNumber(loginSerialNumber);
        return timeManageService.deleteTimeRecord(timeRecordVO);
    }

            /**
     * # ?????? ????????? ??????.
     * ?????? ???????????? ????????????.
     * @param activityVO
     * @return ResultMVO
     * 
     */
    @GetMapping("activityList")
    public String getActivityList(
        @RequestParam (value = "searchGoalIdList", required = false) List<String> searchGoalIdList,
        @RequestParam (value = "searchActivityIdList", required = false) List<String> searchActivityIdList, 
    ActivityVO activityVO){
        JsonObject jo = new JsonObject();


        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();

        if(CollectionUtils.isNotEmpty(searchGoalIdList))
            activityVO.setSearchGoalIdList(searchGoalIdList);
        if(CollectionUtils.isNotEmpty(searchActivityIdList))
            activityVO.setSearchActivityIdList(searchActivityIdList);
      

        activityVO.setMemberSerialNumber(loginSerialNumber);

        List<ActivityMVO> activityList = new ArrayList<ActivityMVO>();
        activityList = timeManageService.getActivityList(activityVO);
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);
        JsonArray activityListJsonArray = new Gson().toJsonTree(activityList).getAsJsonArray();
        jo.add("activityList", activityListJsonArray);
        return jo.toString();
    }
        /**
     * # ?????? ????????? ?????????.
     * ?????? ???????????? ????????????.
     * ?????? ?????? ????????? ???????????? ?????? ??????.
     * ?????? ??????????????? ????????????.
     * @param activityVO
     * @return ResultMVO
     * 
     */
    @PostMapping("getActivityListTEST")
    public String getActivityListTest(){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);

        // ???????????? ????????? ??????.
        ActivityVO activityVO = new ActivityVO();
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        activityVO.setMemberSerialNumber(loginSerialNumber);

        List<ActivityMVO> activityList = timeManageService.getActivityList(activityVO);
        JsonArray activityListJsonArray = new Gson().toJsonTree(activityList).getAsJsonArray();
        jo.add("activityList", activityListJsonArray);

        return jo.toString();
    }



        /**
     * # ?????? ?????? .
     * @param activityVO
     * @return ResultMVO
     * 
     */
    @PostMapping("activity")
    public ResultMVO insertActivity(@RequestBody ActivityVO activityVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        activityVO.setMemberSerialNumber(loginSerialNumber);

        timeManageService.insertActivity(activityVO);
        LOGGER.info("insertActivity Id : {}", activityVO.getActivityId());

        //set activity Info
        String[] searchGoalIdArray = {activityVO.getActivityId()};
        ActivityVO param1 = new ActivityVO();
        param1.setMemberSerialNumber(param1.getMemberSerialNumber());
        param1.setSearchActivityIdList(Arrays.asList(searchGoalIdArray));
        resultMVO.setActivityInfo(timeManageService.getActivityList(param1).get(0));

        return resultMVO;
    }

    /**
     * # ?????? ?????? ?????????.
     * ?????? ????????? ????????? ??????.
     * ?????? ??????????????? ????????????.
     * @param activityVO
     * @return ResultMVO
     * 
     */
    @PostMapping("activityTEST")
    public ResultMVO insertActivityTest(@RequestBody ActivityVO activityVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }


        /**
     * # ?????? ?????? 
     * @param activityVO
     * @return ResultMVO
     * 
     */
    @PutMapping("activity")
    public ResultMVO updateActivity(@RequestBody ActivityVO activityVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        activityVO.setMemberSerialNumber(loginSerialNumber);

        timeManageService.updateActivity(activityVO);

        //set activity Info
        String[] searchGoalIdArray = {activityVO.getActivityId()};
        ActivityVO param1 = new ActivityVO();
        param1.setMemberSerialNumber(param1.getMemberSerialNumber());
        param1.setSearchActivityIdList(Arrays.asList(searchGoalIdArray));
        resultMVO.setActivityInfo(timeManageService.getActivityList(param1).get(0));

        return resultMVO;
    }

    /**
     * # ?????? ?????? ?????????.
     * ?????? ????????? ????????? ??????.
     * ?????? ??????????????? ????????????.
     * @param activityVO
     * @return ResultMVO
     * 
     */
    @PutMapping("activityTEST")
    public ResultMVO updateActivityTest(@RequestBody ActivityVO activityVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }




           /**
     * # ?????? ??????
     * ???????????? query parameter??? ???????????????.(HTTP DELETE METHOD??? ??????.)
     * @param activityVO
     * @return ResultMVO
     * 
     */
    @DeleteMapping("activity")
    public ResultMVO deleteActivity(ActivityVO activityVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        activityVO.setMemberSerialNumber(loginSerialNumber);

        timeManageService.deleteActivity(activityVO);

        ActivityMVO activityMVO = new ActivityMVO();
        activityMVO.setActivityId(activityVO.getActivityId());;
        resultMVO.setActivityInfo(activityMVO);
        return resultMVO;
    }

       /**
     * # ?????? ?????? ?????????.
     * ?????? ????????? ????????? ??????.
     * ?????? ??????????????? ????????????.
     * ???????????? query parameter??? ???????????????.(HTTP DELETE METHOD??? ??????.)
     * @param activityVO
     * @return ResultMVO
     * 
     */
    @DeleteMapping("activityTEST")
    public ResultMVO deleteActivityTest(ActivityVO activityVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }

}
