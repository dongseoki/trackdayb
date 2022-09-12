package com.lds.trackdayb.service;

import java.util.List;

import com.lds.trackdayb.mvo.ActivityMVO;
import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.vo.ActivityVO;
import com.lds.trackdayb.vo.TimeRecordVO;

public interface TimeManageService {

    List<ActivityMVO> getActivityList(ActivityVO activityVO);

    void insertActivity(ActivityVO activityVO);

    void updateActivity(ActivityVO activityVO);

    void deleteActivity(ActivityVO activityVO);
}
