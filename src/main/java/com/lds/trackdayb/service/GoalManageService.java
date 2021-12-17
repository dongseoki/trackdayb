package com.lds.trackdayb.service;

import java.util.List;

import com.lds.trackdayb.mvo.GoalMVO;
import com.lds.trackdayb.vo.GoalVO;

public interface GoalManageService {

    void insertGoal(GoalVO goalVO) ;

    void updateGoal(GoalVO goalVO) ;
    void updateGoalProgressRate(GoalVO goalVO);

    void deleteGoal(GoalVO goalVO) ;

    List<GoalMVO> getGoalTitleList(GoalVO goalVO);

    List<GoalMVO> getGoalFullList(GoalVO goalVO);

    boolean checkGoalOwnership(GoalVO goalVO);

}
