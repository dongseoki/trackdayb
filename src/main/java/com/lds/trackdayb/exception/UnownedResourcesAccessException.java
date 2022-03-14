package com.lds.trackdayb.exception;

import com.lds.trackdayb.util.ResponseCodeUtil;

public class UnownedResourcesAccessException extends CustomException {
    public UnownedResourcesAccessException(String msg) {
        super(ResponseCodeUtil.RESULT_CODE_UNOWNEED_RESOURCES_ACCESS,msg);
    }
}
