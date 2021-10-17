package com.lds.trackdayb.mvo;

import lombok.Data;

@Data
public class ResultMVO {
    String resultCode ="";
    String message = "";
    GoalMVO goalInfo = null;
    ActivityMVO activityInfo = null;
}
