package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class UnsupportFilePartNameException extends CustomException {
    public UnsupportFilePartNameException(String message){
        super(ResponseCodeUtil.RESULT_CODE_UNSUPPORT_FILE_PART_NAME, message);
    }
}
