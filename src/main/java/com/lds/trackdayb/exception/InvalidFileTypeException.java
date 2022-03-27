package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class InvalidFileTypeException extends CustomException {
    public InvalidFileTypeException(String message) {
        super(ResponseCodeUtil.RESULT_CODE_INVALID_FILE_TYPE, message);
    }

}
