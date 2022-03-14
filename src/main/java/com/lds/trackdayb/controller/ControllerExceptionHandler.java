package com.lds.trackdayb.controller;

import com.lds.trackdayb.exception.CustomException;
import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.util.ResponseCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

//    @ExceptionHandler(IllegalStateException.class)
//    protected ResponseEntity<ResultMVO> handleCustomException(IllegalStateException e){
//        LOGGER.error("handle Exception Test");
//        ResultMVO resultMVO = new ResultMVO();
//        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
//        resultMVO.setMessage("error test");
//        HttpHeaders httpHeaders = new HttpHeaders();
//        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ResultMVO> handleCustomException(CustomException e){
        LOGGER.error("handle Custom Exception ",e);
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(e.getResultCode());
        resultMVO.setMessage(e.getMessage());
        HttpHeaders httpHeaders = new HttpHeaders();
        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.BAD_REQUEST);
    }


    // test 해보고 적용할것.
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ResultMVO> handleGeneralException(Exception e){
        LOGGER.error("handle General Exception ",e);
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_FAIL);
        resultMVO.setMessage(e.getMessage());
        HttpHeaders httpHeaders = new HttpHeaders();
        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.BAD_REQUEST);
    }
}
