package com.lds.trackdayb.service;

import com.lds.trackdayb.repository.TimeManageRepository;
import com.lds.trackdayb.vo.TimeRecordVO;
import org.springframework.stereotype.Service;

@Service
public class TimeManageServiceImpl implements TimeManageService{
    private final TimeManageRepository timeManageRepository;

    public TimeManageServiceImpl(TimeManageRepository timeManageRepository) {
        this.timeManageRepository = timeManageRepository;
    }

    @Override
    public void createTimeRecord(TimeRecordVO vo) {
        if(vo.getActivityRecordDTOList().size()>=1){
            timeManageRepository.insertTimeRecord(vo);
            timeManageRepository.insertActivityRecords(vo);
        }

    }
}
