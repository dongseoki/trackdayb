package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class ValidateException extends CustomException {
    public ValidateException(String msg) { super(ResponseCodeUtil.RESULT_CODE_ID_PASSWORD_VALID_FAIL,msg); }

}
