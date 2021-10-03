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
    public String getGoalTitleList(@RequestBody GoalVO goalVO){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalTitleList = goalService.getGoalTitleList(goalVO);
        
        JsonArray goalTitleListJsonArray = new Gson().toJsonTree(goalTitleList).getAsJsonArray();
        jo.add("goalTitleList", goalTitleListJsonArray);
        return jo.toString();
    }

    /**
     * # 목표 제목 리스트 테스트.
     * 검색 조회 조건이 반영되지 않았다.
     * 항상 성공 코드를 반환한다.
     * 제목 리스트 테스트 메서드는 목표의 내용, 목표에 연결된 주기성 정보는 반환하지 않는다.
     * @param goalVO
     * @return ResultMVO
     */
    @PostMapping("/getGoalTitleListTEST")
    public String getGoalTitleListTest(){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        // @RequestBody GoalVO goalVO
        GoalVO param = new GoalVO();
        param.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalTitleList = goalService.getGoalTitleList(param);

        JsonArray goalTitleListJsonArray = new Gson().toJsonTree(goalTitleList).getAsJsonArray();
        jo.add("goalTitleList", goalTitleListJsonArray);
        return jo.toString();
    }

    
    @PostMapping("/getGoalFullList")
    public String getGoalFullList(@RequestBody GoalVO goalVO){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goalFullList = goalService.getGoalFullList(goalVO);
        JsonArray goalFullListJsonArray = new Gson().toJsonTree(goalFullList).getAsJsonArray();
        jo.add("goalFullList", goalFullListJsonArray);
        
        return jo.toString();
    }


    /**
     * # 목표 전체 리스트 테스트.
     * 검색 조회 조건이 반영되지 않았다.
     * 항상 성공 코드를 반환한다.
     * @param goalVO
     * @return jsonObject
     */
    @PostMapping("/getGoalFullListTEST")
    public String getGoalFullListTest(@RequestBody GoalVO goalVO){
        JsonObject jo = new JsonObject();
        jo.addProperty("resultCode", ResponseCodeUtil.RESULT_CODE_SUCESS);

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
    public ResultMVO insertGoal(@RequestBody GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        try {
            goalService.insertGoal(goalVO);
        } catch (Exception e) {
            LOGGER.error("insertGoal error : {}", e.toString());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
        }
        return resultMVO;
    }

    /**
     * # 목표 삽입 테스트.
     * db 데이터 조작은 없다.
     * 항상 성공 코드를 반환한다.
     * @param goalVO
     * @return ResultMVO
     */
    @PostMapping("/goalTEST")
    public ResultMVO insertGoalTest(@RequestBody GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }


    @PutMapping("/goal")
    public ResultMVO updateGoal(@RequestBody GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        try {
            goalService.updateGoal(goalVO);
        } catch (Exception e) {
            LOGGER.error("update error : {}", e.toString());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
        }

        return resultMVO;
    }

    /**
     * # 목표 수정 테스트.
     * db 데이터 조작은 없다.
     * 항상 성공 코드를 반환한다.
     * @param goalVO
     * @return ResultMVO
     */
    @PutMapping("/goalTEST")
    public ResultMVO updateGoalTest(@RequestBody GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }

    @DeleteMapping("/goal")
    public ResultMVO deleteGoal(GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);

        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        try {
            goalService.deleteGoal(goalVO);
        } catch (Exception e) {
            LOGGER.error("deleteGoal error : {}", e.toString());
            resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
        }
        return resultMVO;
    }

    /**
     * # 목표 삭제 테스트.
     * db 데이터 조작은 없다.
     * 항상 성공 코드를 반환한다.
     * @param goalVO
     * @return ResultMVO
     */
    @DeleteMapping("/goalTEST")
    public ResultMVO deleteGoalTest(GoalVO goalVO){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return resultMVO;
    }

}
