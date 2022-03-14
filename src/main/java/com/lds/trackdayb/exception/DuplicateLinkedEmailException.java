package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class DuplicateLinkedEmailException  extends CustomException {
    public DuplicateLinkedEmailException(String msg) { super(ResponseCodeUtil.RESULT_CODE_DUPLICATE_SNS_EMAIL,msg); }
}
