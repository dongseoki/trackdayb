package com.lds.trackdayb.vo;

import java.util.ArrayList;
import java.util.List;

import com.lds.trackdayb.dto.GoalDTO;
import com.lds.trackdayb.dto.PeriodicityInfoDTO;

import lombok.Data;

@Data
public class GoalVO extends GoalDTO{
    PeriodicityInfoDTO periodicityInfo = new PeriodicityInfoDTO();
    String searchStartDatetime = "";
    String searchEndDatetime = "";
    String searchKind = "";
    String orderColumn = "";
    String orderType = "";
    List<String> searchGoalIdList = new ArrayList<String>();
}
