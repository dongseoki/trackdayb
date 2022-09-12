package com.lds.trackdayb.service;

import java.util.Arrays;
import java.util.List;

import com.lds.trackdayb.dto.PeriodicityInfoDTO;
import com.lds.trackdayb.exception.UnownedResourcesAccessException;
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
            throw new UnownedResourcesAccessException("UnownedResourcesAccessException occured");
        }

        goalManageRepository.updateGoal(goalVO);
        if(StringUtils.equals(goalVO.getKind(), CommonCodeUtil.GOAL_KIND_REGULAR)){
            PeriodicityInfoDTO param = goalVO.getPeriodicityInfo();
            param.setGoalId(goalVO.getGoalId());
            goalManageRepository.updatePeriodicityInfo(param);
        }
    }

    @Override
    public void updateGoalProgressRate(GoalVO goalVO) {
        if (!checkGoalOwnership(goalVO)){
            throw new UnownedResourcesAccessException("UnownedResourcesAccessException occured");
        }
        goalManageRepository.updateGoalProgressRate(goalVO);
    }


    @Override
    public void deleteGoal(GoalVO goalVO) {
        if (!checkGoalOwnership(goalVO)){
            throw new UnownedResourcesAccessException("UnownedResourcesAccessException occured");
        }

        // 계층관계. A->B->C,D 인 경우.
        // B를 삭제하는경우, C,D의 부모 목표를 A로 설정하는 과정.(A가 공백또는 null이여도 가능.)
        GoalVO param = new GoalVO();
        if(StringUtils.isNotEmpty(goalVO.getGoalId())){

            // 삭제 대상 목표 조회. 부모 ID 정보를 얻기 위함.
            GoalVO deleteGoalVO = new GoalVO();
            deleteGoalVO.setSearchGoalId(goalVO.getGoalId());
            GoalMVO deleteGoal = goalManageRepository.getGoalTitleList(deleteGoalVO).get(0);

            param.setSearchParentId(deleteGoal.getGoalId());
            for (GoalMVO updateParam : goalManageRepository.getGoalFullList(param)){
                String parentId = deleteGoal.getParentId();
                updateParam.setParentId(parentId);
                if (StringUtils.isEmpty(parentId)){
                    updateParam.setColor(CommonCodeUtil.getRandomHexColor());
                }


                goalManageRepository.updateGoal(updateParam);
                LOGGER.debug("in delete, update targetGoal : {}, updatedParentId : {}", updateParam.getGoalId(), updateParam.getParentId());
            }
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
