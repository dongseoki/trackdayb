package com.lds.trackdayb.mvo;

import com.lds.trackdayb.dto.MemberInfo;
import com.lds.trackdayb.dto.TokenDTO;
import lombok.Data;

@Data
public class ResultMVO {
    String resultCode ="";
    String message = "";
    TokenDTO tokenInfo = new TokenDTO();
    GoalMVO goalInfo = null;
    ActivityMVO activityInfo = null;
    MemberInfo memberInfo;
    String memberId = null;
    PublicKeyInfo publicKeyInfo = null;
}
