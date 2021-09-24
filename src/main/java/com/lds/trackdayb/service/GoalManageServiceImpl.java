package com.lds.trackdayb.service;

import java.util.List;

import com.lds.trackdayb.mvo.GoalMVO;
import com.lds.trackdayb.repository.GoalManageRepository;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.vo.GoalVO;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GoalManageServiceImpl implements GoalManageService {
    private final GoalManageRepository goalManageRepository;

    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageServiceImpl.class);
    
    @Override
    public void insertGoal(GoalVO goalVO) {
        goalManageRepository.insertGoal(goalVO);
        if(StringUtils.equals(goalVO.getKind(), CommonCodeUtil.GOAL_KIND_REGULAR)){
            goalManageRepository.insertPeriodicityInfo(goalVO);
        }
    }

    @Override
    public void updateGoal(GoalVO goalVO) {
        goalManageRepository.updateGoal(goalVO);
        if(StringUtils.equals(goalVO.getKind(), CommonCodeUtil.GOAL_KIND_REGULAR)){
            goalManageRepository.updatePeriodicityInfo(goalVO);
        }
    }

    @Override
    public void deleteGoal(GoalVO goalVO) {
        goalManageRepository.deleteGoal(goalVO);
        if(StringUtils.equals(goalVO.getKind(), CommonCodeUtil.GOAL_KIND_REGULAR)){
            goalManageRepository.deletePeriodicityInfo(goalVO);
        }
    }

    @Override
    public List<GoalMVO> getGoalTitleList(GoalVO goalVO) {
        return goalManageRepository.getGoalTitleList(goalVO);
    }

    @Override
    public List<GoalMVO> getGoalFullList(GoalVO goalVO) {
        return goalManageRepository.getGoalFullList(goalVO);
    }
    
}
