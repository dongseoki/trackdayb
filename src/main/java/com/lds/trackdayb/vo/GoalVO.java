package com.lds.trackdayb.vo;

import java.util.ArrayList;
import java.util.List;

import com.lds.trackdayb.dto.GoalDTO;
import com.lds.trackdayb.dto.PeriodicityInfoDTO;
import com.lds.trackdayb.util.CommonCodeUtil;

import lombok.Data;

@Data
public class GoalVO extends GoalDTO{
    PeriodicityInfoDTO periodicityInfo = new PeriodicityInfoDTO();
    String searchStartDatetime = "";
    String searchEndDatetime = "";
    String searchRangeOption = CommonCodeUtil.SEARCH_RANGE_EXIST; // 검색 범위 옵션. 기본 값 존재.
    String searchKind = "";
    String orderColumn = "";
    String orderType = "";
    List<String> searchGoalIdList = new ArrayList<String>();
}
