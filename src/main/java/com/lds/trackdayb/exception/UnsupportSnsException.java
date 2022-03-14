package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class UnsupportSnsException extends CustomException{
    public UnsupportSnsException(String message) {
        super(ResponseCodeUtil.RESULT_CODE_UNSUPPORT_SNS, message);
    }
}
