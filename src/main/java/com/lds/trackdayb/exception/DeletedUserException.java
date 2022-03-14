package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class DeletedUserException  extends CustomException {
    public DeletedUserException(String msg) { super(ResponseCodeUtil.RESULT_CODE_DELETED_USER, msg); }

}
