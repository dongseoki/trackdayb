package com.lds.trackdayb.service;

import com.lds.trackdayb.repository.TimeRecordRepository;
import com.lds.trackdayb.vo.TimeRecordVO;
import org.springframework.stereotype.Service;

@Service
public class TimeManageServiceImpl implements TimeManageService{
    private final TimeRecordRepository timeRecordRepository;

    public TimeManageServiceImpl(TimeRecordRepository timeRecordRepository) {
        this.timeRecordRepository = timeRecordRepository;
    }

    @Override
    public void createTimeRecord(TimeRecordVO vo) {
        timeRecordRepository.insertTimeRecord(vo);
    }
}
