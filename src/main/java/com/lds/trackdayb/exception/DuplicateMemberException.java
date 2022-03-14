package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class DuplicateMemberException extends CustomException {
    public DuplicateMemberException(String message) {
        super(ResponseCodeUtil.RESULT_CODE_DUPLICATE_MEMBER,message);
    }
}
