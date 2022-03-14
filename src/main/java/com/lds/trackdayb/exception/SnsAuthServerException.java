package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class SnsAuthServerException extends CustomException{

    public SnsAuthServerException(String message) {
        super(ResponseCodeUtil.RESULT_CODE_SNS_AUTH_SERVER_FAIL, message);
    }
}
