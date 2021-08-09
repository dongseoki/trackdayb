package com.lds.trackdayb.service;

import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.repository.SystemManageRepository;
import com.lds.trackdayb.repository.TimeManageRepository;
import com.lds.trackdayb.vo.TimeRecordVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TimeManageServiceImpl implements TimeManageService{
    private final TimeManageRepository timeManageRepository;
    private final SystemManageRepository systemManageRepository;

    @Override
    public void createTimeRecord(TimeRecordVO vo) {
        if(vo.getActivityRecordDTOList().size()>=1){
            // TODO 기존의 TimeRecord 튜플이 존재하는지 확인 필요.
            timeManageRepository.insertTimeRecord(vo);
            timeManageRepository.insertActivityRecords(vo);
        }

    }
    
    @Override
    public TimeRecordMVO selectTimeRecord(TimeRecordVO vo){


        return timeManageRepository.selectTimeRecord(vo);
    }

    /*
    * @param
    * @return type
    * 무엇을 왜 하는 함수.
    * */
    @Override
    public TimeRecordMVO modifyTimeRecord(TimeRecordVO timeRecordVO) {

        // 기존 엑티비티 레코드 삭제처리. : activity record는 수정없이 생성과 삭제 만으로 이루어져 있기 때문.
        timeManageRepository.deleteActivityRecords(timeRecordVO);

        // 타임 레코드 수정 시간을 수정.
        timeManageRepository.updateTimeRecord(timeRecordVO);

        timeManageRepository.insertActivityRecords(timeRecordVO);

        // 수정 정보 반환
        TimeRecordMVO timeRecordMVO = new TimeRecordMVO();
        timeRecordMVO.setTimeRecordId(timeRecordVO.getTimeRecordId());
        return timeRecordMVO;
    }

    @Override
    public TimeRecordMVO deleteTimeRecord(TimeRecordVO timeRecordVO) {
        // timeRecordVO.setDeletionStatus("Y");
        // timeManageRepository.updateTimeRecord(timeRecordVO);
        timeManageRepository.deleteTimeRecord(timeRecordVO);


        // 삭제 정보 반환.
        TimeRecordMVO timeRecordMVO = new TimeRecordMVO();
        timeRecordMVO.setTimeRecordId(timeRecordVO.getTimeRecordId());
        return timeRecordMVO;
    }
}
