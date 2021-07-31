package com.lds.trackdayb.repository;

import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.vo.TimeRecordVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface TimeManageRepository {
    void insertTimeRecord(TimeRecordVO vo);
    void insertActivityRecords(TimeRecordVO vo);

    TimeRecordMVO selectTimeRecord(TimeRecordVO vo);

    void updateTimeRecord(TimeRecordVO timeRecordVO);

    void updateActivityRecords(TimeRecordVO timeRecordVO);
    void deleteTimeRecord(TimeRecordVO timeRecordVO);
	void deleteActivityRecords(TimeRecordVO timeRecordVO);
}
