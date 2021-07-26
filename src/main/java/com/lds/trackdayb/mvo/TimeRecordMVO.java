package com.lds.trackdayb.mvo;

import com.lds.trackdayb.dto.ActivityRecordDTO;
import com.lds.trackdayb.dto.TimeRecordDTO;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TimeRecordMVO extends TimeRecordDTO {
    List<ActivityRecordDTO> activityRecordDTOList = new ArrayList<ActivityRecordDTO>();

//    public List<ActivityRecordDTO> getActivityRecordDTOList() {
//        return activityRecordDTOList;
//    }
//
//    public void setActivityRecordDTOList(List<ActivityRecordDTO> activityRecordDTOList) {
//        this.activityRecordDTOList = activityRecordDTOList;
//    }
}
