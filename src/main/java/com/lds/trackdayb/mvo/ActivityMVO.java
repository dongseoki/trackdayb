package com.lds.trackdayb.mvo;

import com.lds.trackdayb.dto.ActivityDTO;
import com.lds.trackdayb.dto.GoalDTO;

import lombok.Data;
@Data
public class ActivityMVO extends ActivityDTO {
    GoalDTO goalTitleInfo = new GoalDTO();
}
