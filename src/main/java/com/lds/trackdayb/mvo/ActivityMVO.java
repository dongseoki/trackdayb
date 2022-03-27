package com.lds.trackdayb.mvo;

import com.lds.trackdayb.dto.ActivityDTO;
import com.lds.trackdayb.dto.GoalDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActivityMVO extends ActivityDTO {
    GoalDTO goalTitleInfo = new GoalDTO();
}
