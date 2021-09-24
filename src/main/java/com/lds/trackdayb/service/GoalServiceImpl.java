package com.lds.trackdayb.service;

import java.util.List;

import com.lds.trackdayb.mvo.GoalMVO;
import com.lds.trackdayb.vo.GoalVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GoalServiceImpl implements GoalService {
    // private final GoalRepository goalRepository;

    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageServiceImpl.class);
    
    @Override
    public void insertGoal(GoalVO goalVO) {
        // goalRepository.insertGoal(goalVO);
    }

    @Override
    public void updateGoal(GoalVO goalVO) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void deleteGoal(GoalVO goalVO) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public List<GoalMVO> getGoalTitleList(GoalVO goalVO) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<GoalMVO> getGoalFullList(GoalVO goalVO) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
