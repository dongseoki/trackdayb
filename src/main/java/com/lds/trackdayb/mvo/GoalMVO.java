package com.lds.trackdayb.mvo;

import java.util.ArrayList;
import java.util.List;

import com.lds.trackdayb.dto.GoalDTO;
import com.lds.trackdayb.dto.PeriodicityInfoDTO;

import lombok.Data;

@Data
public class GoalMVO extends GoalDTO {
    PeriodicityInfoDTO periodicityInfo = new PeriodicityInfoDTO();
    String goalIdPath;
    String goalTitlePath;
}
