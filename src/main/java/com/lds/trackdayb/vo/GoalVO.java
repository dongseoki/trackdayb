package com.lds.trackdayb.vo;

import com.lds.trackdayb.dto.GoalDTO;
import com.lds.trackdayb.dto.PeriodicityInfoDTO;

import lombok.Data;

@Data
public class GoalVO extends GoalDTO{
    PeriodicityInfoDTO periodicityInfo = new PeriodicityInfoDTO();
}
