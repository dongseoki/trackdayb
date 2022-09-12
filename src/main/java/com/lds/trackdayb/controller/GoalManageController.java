package com.lds.trackdayb.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.lds.trackdayb.mvo.GoalMVO;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.service.GoalManageService;
import com.lds.trackdayb.service.MemberService;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.vo.GoalVO;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/goalManage")
public class GoalManageController {
    private final GoalManageService goalService;
    private final MemberService memberService;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);

    @GetMapping("/goalTitleList")
    public String getGoalTitleList(@RequestParam (value = "searchGoalIdList", required = false) List<String> searchGoalIdList, GoalVO goalVO){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        LOGGER.info("getGoalTitleList getMyUserWithAuthorities loginSerialNumber test: " + loginSerialNumber);
        if(CollectionUtils.isNotEmpty(searchGoalIdList))
            goalVO.setSearchGoalIdList(searchGoalIdList);

        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalTitleList = goalService.getGoalTitleList(goalVO);
        
        JsonArray goalTitleListJsonArray = new Gson().toJsonTree(goalTitleList).getAsJsonArray();
        jo.add("goalTitleList", goalTitleListJsonArray);

        return jo.toString();
    }
    
    @GetMapping("/goalFullList")
    public String goalFullList(@RequestParam (value = "searchGoalIdList", required = false) List<String> searchGoalIdList, GoalVO goalVO){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        if(CollectionUtils.isNotEmpty(searchGoalIdList))
            goalVO.setSearchGoalIdList(searchGoalIdList);
        
        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalFullList = goalService.getGoalFullList(goalVO);
        JsonArray goalFullListJsonArray = new Gson().toJsonTree(goalFullList).getAsJsonArray();
        jo.add("goalFullList", goalFullListJsonArray);
        
        return jo.toString();
    }

    //POST
    @PostMapping("/goal")
    public ResultMVO insertGoal(@RequestBody GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        goalService.insertGoal(goalVO);

        //set Goal Info
        String[] searchGoalIdArray = {goalVO.getGoalId()};
        GoalVO param1 = new GoalVO();
        param1.setMemberSerialNumber(goalVO.getMemberSerialNumber());
        param1.setSearchGoalIdList(Arrays.asList(searchGoalIdArray));
        resultMVO.setGoalInfo(goalService.getGoalFullList(param1).get(0));

        LOGGER.info("insertGoal Id : {}", goalVO.getGoalId());
        return resultMVO;
    }

    @PutMapping("/goal")
    public ResultMVO updateGoal(@RequestBody GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        goalService.updateGoal(goalVO);

        // set goalInfo
        String[] searchGoalIdArray = {goalVO.getGoalId()};
        GoalVO param1 = new GoalVO();
        param1.setMemberSerialNumber(goalVO.getMemberSerialNumber());
        param1.setSearchGoalIdList(Arrays.asList(searchGoalIdArray));
        resultMVO.setGoalInfo(goalService.getGoalFullList(param1).get(0));

        return resultMVO;
    }

    @PatchMapping("/goal/progress-rate")
    public ResultMVO updateGoalProgressRate(@RequestBody Map<String, String> updateMap){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        GoalVO goalVO = new GoalVO();
        goalVO.setGoalId(updateMap.get("goalId"));
        goalVO.setProgressRate(updateMap.get("progressRate"));
        goalVO.setMemberSerialNumber(loginSerialNumber);

        goalService.updateGoalProgressRate(goalVO);

        // set goalInfo
        String[] searchGoalIdArray = {goalVO.getGoalId()};
        GoalVO param1 = new GoalVO();
        param1.setMemberSerialNumber(goalVO.getMemberSerialNumber());
        param1.setSearchGoalIdList(Arrays.asList(searchGoalIdArray));
        resultMVO.setGoalInfo(goalService.getGoalFullList(param1).get(0));


        return resultMVO;
    }

    @DeleteMapping("/goal")
    public ResultMVO deleteGoal(GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = memberService.getMyUserWithAuthorities().getMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);

        goalService.deleteGoal(goalVO);

        GoalMVO goalMVO = new GoalMVO();
        goalMVO.setGoalId(goalVO.getGoalId());
        resultMVO.setGoalInfo(goalMVO);

        return resultMVO;
    }
}
