package com.lds.trackdayb.service;

import java.util.List;

import com.lds.trackdayb.mvo.ActivityMVO;
import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.vo.ActivityVO;
import com.lds.trackdayb.vo.TimeRecordVO;

public interface TimeManageService {
    void createTimeRecord(TimeRecordVO vo);

    TimeRecordMVO selectTimeRecord(TimeRecordVO vo);

    TimeRecordMVO modifyTimeRecord(TimeRecordVO timeRecordVO);

    TimeRecordMVO deleteTimeRecord(TimeRecordVO timeRecordVO);

    List<TimeRecordMVO> selectTimeRecordList(List<String> selectedDateList, String memberSerialNumber);

    List<ActivityMVO> getActivityList(ActivityVO activityVO);

    void insertActivity(ActivityVO activityVO);

    void updateActivity(ActivityVO activityVO);

    void deleteActivity(ActivityVO activityVO);
}
