package com.lds.trackdayb.repository;

import java.util.List;

import com.lds.trackdayb.dto.PeriodicityInfoDTO;
import com.lds.trackdayb.mvo.GoalMVO;
import com.lds.trackdayb.vo.GoalVO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface GoalManageRepository {

    void insertGoal(GoalVO goalVO);

    void insertPeriodicityInfo(PeriodicityInfoDTO pDto);

    void updateGoal(GoalVO goalVO);

    void updatePeriodicityInfo(PeriodicityInfoDTO pDto);

    void deleteGoal(GoalVO goalVO);

    void deletePeriodicityInfo(PeriodicityInfoDTO pDto);

    List<GoalMVO> getGoalTitleList(GoalVO goalVO);

    List<GoalMVO> getGoalFullList(GoalVO goalVO);
    
}
