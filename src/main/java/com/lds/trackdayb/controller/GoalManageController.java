package com.lds.trackdayb.controller;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.lds.trackdayb.mvo.GoalMVO;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.service.GoalManageService;
import com.lds.trackdayb.service.TestService;
import com.lds.trackdayb.util.ResponseCodeUtil;
import com.lds.trackdayb.vo.GoalVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/goalManage")
public class GoalManageController {
    private  final TestService testService;
    private final GoalManageService goalService;
    // private final SystemManageService systemManageService;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageController.class);

    @GetMapping("/test")
    public String test(){
        return "test";
    }

    @PostMapping("/getGoalTitleList")
    public String getGoalTitleList(GoalVO goalVO){
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalTitleList = goalService.getGoalTitleList(goalVO);
        return "";
    }
    @PostMapping("/getGoalTitleListTEST")
    public String getGoalTitleListTest(GoalVO goalVO){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalTitleList = goalService.getGoalTitleList(goalVO);
        JsonArray goalTitleListJsonArray = new Gson().toJsonTree(goalTitleList).getAsJsonArray();
        jo.add("goalTitleList", goalTitleListJsonArray);
        return jo.toString();
    }

    @PostMapping("/getGoalFullList")
    public String getGoalFullList(GoalVO goalVO){
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalFullList = goalService.getGoalFullList(goalVO);
        JsonObject jo = new JsonObject();
        return "";
    }
    @PostMapping("/getGoalFullListTEST")
    public String getGoalFullListTest(@RequestBody GoalVO goalVO){
        // String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        // goalVO.setMemberSerialNumber(loginSerialNumber);
        // List<GoalMVO> goalFullList = goalService.getGoalFullList(goalVO);
        JsonObject jo = new JsonObject();

        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);
        
        // test1
        ArrayList<String> camelCaseList = new ArrayList<String>();
        camelCaseList.add("test1");
        camelCaseList.add("test2");
        // jo.addProperty("testList", gson.toJson(camelCaseList));
        JsonArray jsonArray = new Gson().toJsonTree(camelCaseList).getAsJsonArray();
        // jo.add("testList", jsonArray);

        // test2
        ArrayList<GoalMVO> test2 = new ArrayList<GoalMVO>();
        GoalMVO g1 = new GoalMVO();
        g1.setKind("test");
        GoalMVO g2 = new GoalMVO();
        g2.setKind("test");
        test2.add(g1);
        test2.add(g2);
        JsonArray jsonArray2 = new Gson().toJsonTree(test2).getAsJsonArray();
        // jo.add("testList2", jsonArray2);

        // test3
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalFullList = goalService.getGoalFullList(goalVO);
        JsonArray goalFullListJsonArray = new Gson().toJsonTree(goalFullList).getAsJsonArray();
        jo.add("goalFullList", goalFullListJsonArray);
        
        
        return jo.toString();
    }

    //ip:port/goalManage/goal
    //POST
    @PostMapping("/goal")
    public String insertGoal(@RequestBody GoalVO goalVO){
        // FIXME 로그인 아이디 조회.
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        goalService.insertGoal(goalVO);
        return "";
    }

    @PostMapping("/goalTEST")
    public ResultMVO insertGoalTest(@RequestBody GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }

    @PutMapping("/goal")
    public String updateGoal(@RequestBody GoalVO goalVO){
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        goalService.updateGoal(goalVO);
        return "";
    }

    @PutMapping("/goalTEST")
    public ResultMVO updateGoalTest(@RequestBody GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }

    @DeleteMapping("/goal")
    public String deleteGoal(GoalVO goalVO){
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        goalService.deleteGoal(goalVO);
        return "";
    }

    @DeleteMapping("/goalTEST")
    public ResultMVO deleteGoalTest(GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }

}
