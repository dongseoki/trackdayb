package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class InvalidRefreshTokenException extends CustomException{
    public InvalidRefreshTokenException(String message) {
        super(ResponseCodeUtil.RESULT_CODE_INVALID_REFRESH_TOKEN, message);
    }
}
