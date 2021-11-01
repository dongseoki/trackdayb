package com.lds.trackdayb.vo;

import java.util.ArrayList;
import java.util.List;

import com.lds.trackdayb.dto.ActivityDTO;
import com.lds.trackdayb.util.CommonCodeUtil;

import lombok.Data;

@Data
public class ActivityVO extends ActivityDTO {
    String searchStartDatetime = "";
    String searchEndDatetime = "";
    String searchRangeOption = CommonCodeUtil.SEARCH_RANGE_EXIST; // 검색 범위 옵션. 기본 값 존재.
    String orderColumn = "";
    String orderType = "";
    List<String> searchActivityIdList = new ArrayList<String>();
    List<String> searchGoalIdList = new ArrayList<String>();
    String otherIncludedYn = ""; // 기타 포함 여부.
}
