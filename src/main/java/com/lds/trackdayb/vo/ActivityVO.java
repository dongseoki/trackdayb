package com.lds.trackdayb.vo;

import java.util.ArrayList;
import java.util.List;

import com.lds.trackdayb.dto.ActivityDTO;

import lombok.Data;

@Data
public class ActivityVO extends ActivityDTO {
    String searchStartDatetime = "";
    String searchEndDatetime = "";
    String orderColumn = "";
    String orderType = "";
    List<String> searchActivityIdList = new ArrayList<String>();
    List<String> searchGoalIdList = new ArrayList<String>();
    String otherIncludedYn = ""; // 기타 포함 여부.
}
