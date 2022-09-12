package com.lds.trackdayb.service;

import java.util.Arrays;
import java.util.List;

import com.lds.trackdayb.exception.UnownedResourcesAccessException;
import com.lds.trackdayb.mvo.ActivityMVO;
import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.repository.SystemManageRepository;
import com.lds.trackdayb.repository.TimeManageRepository;
import com.lds.trackdayb.vo.ActivityVO;
import com.lds.trackdayb.vo.GoalVO;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TimeManageServiceImpl implements TimeManageService{
    private final TimeManageRepository timeManageRepository;
    private final GoalManageService goalManageService;
    private final SystemManageRepository systemManageRepository;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageServiceImpl.class);

    @Override
    public List<ActivityMVO> getActivityList(ActivityVO activityVO) {
        return timeManageRepository.getActivityList(activityVO);
    }

    @Override
    public void insertActivity(ActivityVO activityVO) {
        if(StringUtils.isNotBlank(activityVO.getGoalId())){
            // 입력된 goal의 소유권 파악.
            // 자신이 소유한 목표id만 등록 가능.
            GoalVO goalVO = new GoalVO();
            goalVO.setMemberSerialNumber(activityVO.getMemberSerialNumber());
            goalVO.setGoalId(activityVO.getGoalId());
            if (!goalManageService.checkGoalOwnership(goalVO)){
                throw new UnownedResourcesAccessException("UnownedResourcesAccessException occured");
            }
        }
        timeManageRepository.insertActivity(activityVO);
    }

    public boolean checkActivityOwnership(ActivityVO activityVO){
        String[] searchActivityIdArray = {activityVO.getActivityId()}; 

        ActivityVO param1 = new ActivityVO();
        param1.setMemberSerialNumber(activityVO.getMemberSerialNumber());
        param1.setSearchActivityIdList(Arrays.asList(searchActivityIdArray));
        List<ActivityMVO> resultList = timeManageRepository.getActivityList(param1);
        if (resultList.size() == 0){
            return false;
        }
        return true;
    }

    @Override
    public void updateActivity(ActivityVO activityVO) {
        // activity ID 소유권 파악
        if(!checkActivityOwnership(activityVO)){
            throw new UnownedResourcesAccessException("UnownedResourcesAccessException occured");
        }

        // 입력된 goal의 소유권 파악.
        // 자신이 소유한 목표id만 등록 가능.
        if(StringUtils.isNotBlank(activityVO.getGoalId())){
            GoalVO goalVO = new GoalVO();
            goalVO.setMemberSerialNumber(activityVO.getMemberSerialNumber());
            goalVO.setGoalId(activityVO.getGoalId());
            if (!goalManageService.checkGoalOwnership(goalVO)){
                throw new UnownedResourcesAccessException("UnownedResourcesAccessException occured");
            }
        }

        timeManageRepository.updateActivity(activityVO);
    }

    @Override
    public void deleteActivity(ActivityVO activityVO) {
        // activity ID 소유권 파악
        if(!checkActivityOwnership(activityVO)){
            throw new UnownedResourcesAccessException("UnownedResourcesAccessException occured");
        }
        timeManageRepository.deleteActivity(activityVO);
        
    }
}
