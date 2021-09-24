package com.lds.trackdayb.service;

import java.util.List;

import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.vo.TimeRecordVO;

public interface TimeManageService {
    void createTimeRecord(TimeRecordVO vo);

    TimeRecordMVO selectTimeRecord(TimeRecordVO vo);

    TimeRecordMVO modifyTimeRecord(TimeRecordVO timeRecordVO);

    TimeRecordMVO deleteTimeRecord(TimeRecordVO timeRecordVO);

    List<TimeRecordMVO> selectTimeRecordList(List<String> selectedDateList, String memberSerialNumber);
}
