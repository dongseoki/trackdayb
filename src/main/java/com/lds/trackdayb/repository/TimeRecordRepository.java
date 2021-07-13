package com.lds.trackdayb.repository;

import com.lds.trackdayb.vo.TimeRecordVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TimeRecordRepository {
    void insertTimeRecord(TimeRecordVO vo);
}
