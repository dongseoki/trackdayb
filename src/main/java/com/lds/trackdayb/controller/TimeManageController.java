package com.lds.trackdayb.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.lds.trackdayb.mvo.ActivityMVO;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.service.MemberService;
import com.lds.trackdayb.service.TimeManageService;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.vo.ActivityVO;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
// @Controller
@RequestMapping("/timeManage")
public class TimeManageController {
    private final MemberService memberService;
    private final TimeManageService timeManageService;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);

            /**
     * # 활동 리스트 조회.
     * 실제 데이터를 조회한다.
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
     * # 활동 삽입 .
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
     * # 활동 수정 
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
     * # 활동 삭제
     * 데이터는 query parameter로 넘겨야한다.(HTTP DELETE METHOD의 특징.)
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
}
