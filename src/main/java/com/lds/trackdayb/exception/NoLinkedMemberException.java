package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class NoLinkedMemberException extends CustomException {
    public NoLinkedMemberException(String msg) { super(ResponseCodeUtil.RESULT_CODE_NO_LINKED_MEMBER,msg); }

}
