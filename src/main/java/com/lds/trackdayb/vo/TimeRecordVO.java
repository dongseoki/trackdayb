package com.lds.trackdayb.vo;

import com.lds.trackdayb.dto.ActivityRecordDTO;
import com.lds.trackdayb.dto.TimeRecordDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;




@Getter
@Setter
public class TimeRecordVO extends TimeRecordDTO {
    String memberSerialNumber;
    List<ActivityRecordDTO> activityRecordDTOList= new ArrayList<ActivityRecordDTO>();
    List<String> selectedDateList = new ArrayList<String>();

//    @Override
//    public int getMemberSerialNumber() {
//        return memberSerialNumber;
//    }
//
//    public void setMemberSerialNumber(String memberSerialNumber) {
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
