package com.lds.trackdayb.controller;

import java.util.List;

import com.lds.trackdayb.mvo.GoalMVO;
import com.lds.trackdayb.service.GoalService;
import com.lds.trackdayb.service.TestService;
import com.lds.trackdayb.vo.GoalVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/goalManage")
public class GoalManageController {
    private  final TestService testService;
    private final GoalService goalService;
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

    @PostMapping("/getGoalFullList")
    public String getGoalFullList(GoalVO goalVO){
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        List<GoalMVO> goaFullList = goalService.getGoalFullList(goalVO);
        return "";
    }

    //ip:port/goalManage/goal
    //POST
    @PostMapping("/goal")
    public String insertGoal(GoalVO goalVO){
        // FIXME 로그인 아이디 조회.
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        goalService.insertGoal(goalVO);
        return "";
    }
    @PutMapping("/goal")
    public String updateGoal(GoalVO goalVO){
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        goalService.updateGoal(goalVO);
        return "";
    }

    @DeleteMapping("/goal")
    public String deleteGoal(GoalVO goalVO){
        String loginSerialNumber = testService.selectLoginMemberSerialNumber();
        goalVO.setMemberSerialNumber(loginSerialNumber);
        goalService.deleteGoal(goalVO);
        return "";
    }

}
