package com.lds.trackdayb.mvo;

import lombok.Data;

@Data
public class ResultMVO {
    String resultCode ="";
    String message = "";
    String token = ""; // 인증토큰
    GoalMVO goalInfo = null;
    ActivityMVO activityInfo = null;
    String memberId = null;
}
