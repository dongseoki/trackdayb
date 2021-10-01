package com.lds.trackdayb.service;

import java.util.ArrayList;
import java.util.List;

import com.lds.trackdayb.mvo.ActivityMVO;
import com.lds.trackdayb.mvo.TimeRecordMVO;
import com.lds.trackdayb.repository.SystemManageRepository;
import com.lds.trackdayb.repository.TimeManageRepository;
import com.lds.trackdayb.vo.ActivityVO;
import com.lds.trackdayb.vo.TimeRecordVO;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TimeManageServiceImpl implements TimeManageService{
    private final TimeManageRepository timeManageRepository;
    private final SystemManageRepository systemManageRepository;
    static final Logger LOGGER = LoggerFactory.getLogger(TimeManageServiceImpl.class);

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

    private TimeRecordMVO findTimeRecordMVOFromList(String selectedDate, List<TimeRecordMVO> selectedTimeRecordMVOs){
        for(TimeRecordMVO timeRecordMVO : selectedTimeRecordMVOs){
            if ( StringUtils.equals(selectedDate, timeRecordMVO.getSelectionDate())== true){
                return timeRecordMVO;
            }
            //(selectedDate,timeRecordMVO.getSelectionDate())
        }
        // false case.
        return new TimeRecordMVO();
    }

    @Override
    public List<TimeRecordMVO> selectTimeRecordList(List<String> selectedDateList, String memberSerialNumber) {
        TimeRecordVO timeRecordVO = new TimeRecordVO();
        timeRecordVO.setSelectedDateList(selectedDateList);
        timeRecordVO.setMemberSerialNumber(memberSerialNumber);
        List<TimeRecordMVO> selectedTimeRecordMVOs = timeManageRepository.selectTimeRecordList(timeRecordVO);
        List<TimeRecordMVO> fullTimeRecordMVOs = new ArrayList<TimeRecordMVO>();
        for(String selectedDate : selectedDateList){
            TimeRecordMVO timeRecordMVO =  findTimeRecordMVOFromList(selectedDate,selectedTimeRecordMVOs);
            timeRecordMVO.setSelectionDate(selectedDate);
            fullTimeRecordMVOs.add(timeRecordMVO);
        }
        LOGGER.info("fullTimeRecordMVOs : {}", fullTimeRecordMVOs.toString());
        return fullTimeRecordMVOs;
    }

    @Override
    public List<ActivityMVO> getActivityList(ActivityVO activityVO) {
        // TODO Auto-generated method stub
        return timeManageRepository.getActivityList(activityVO);
    }
}
