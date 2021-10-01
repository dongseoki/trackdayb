package com.lds.trackdayb.service;

import java.util.Arrays;
import java.util.List;

import com.lds.trackdayb.dto.PeriodicityInfoDTO;
import com.lds.trackdayb.mvo.GoalMVO;
import com.lds.trackdayb.repository.GoalManageRepository;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.vo.GoalVO;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
            PeriodicityInfoDTO param = goalVO.getPeriodicityInfo();
            param.setGoalId(goalVO.getGoalId());
            goalManageRepository.insertPeriodicityInfo(param);
        }
    }
    public boolean checkGoalOwnership(GoalVO goalVO){
        String[] searchGoalIdArray = {goalVO.getGoalId()}; 
        GoalVO param1 = new GoalVO();
        param1.setMemberSerialNumber(goalVO.getMemberSerialNumber());
        param1.setSearchGoalIdList(Arrays.asList(searchGoalIdArray));
        List<GoalMVO> resultList = goalManageRepository.getGoalTitleList(param1);
        if (resultList.size() == 0){
            return false;
        }
        return true;
    }

    @Override
    public void updateGoal(GoalVO goalVO) {
        if (!checkGoalOwnership(goalVO)){
            throw new IllegalStateException();
        }

        goalManageRepository.updateGoal(goalVO);
        if(StringUtils.equals(goalVO.getKind(), CommonCodeUtil.GOAL_KIND_REGULAR)){
            PeriodicityInfoDTO param = goalVO.getPeriodicityInfo();
            param.setGoalId(goalVO.getGoalId());
            goalManageRepository.updatePeriodicityInfo(param);
        }
    }

    @Override
    public void deleteGoal(GoalVO goalVO) {
        if (!checkGoalOwnership(goalVO)){
            throw new IllegalStateException();
        }
        goalManageRepository.deleteGoal(goalVO);
        //PeriodicityInfo 는 삭제처리 되지 않음.
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
