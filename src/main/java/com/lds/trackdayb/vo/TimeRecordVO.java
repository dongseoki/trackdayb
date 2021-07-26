package com.lds.trackdayb.vo;

import com.lds.trackdayb.dto.ActivityRecordDTO;
import com.lds.trackdayb.dto.TimeRecordDTO;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TimeRecordVO extends TimeRecordDTO {
    int memberSerialNumber;
    List<ActivityRecordDTO> activityRecordDTOList= new ArrayList<ActivityRecordDTO>();

//    @Override
//    public int getMemberSerialNumber() {
//        return memberSerialNumber;
//    }
//
//    public void setMemberSerialNumber(int memberSerialNumber) {
//        this.memberSerialNumber = memberSerialNumber;
//    }
//
//    public List<ActivityRecordDTO> getActivityRecordDTOList() {
//        return activityRecordDTOList;
//    }
//
//    public void setActivityRecordDTOList(List<ActivityRecordDTO> activityRecordDTOList) {
//        this.activityRecordDTOList = activityRecordDTOList;
//    }
}
