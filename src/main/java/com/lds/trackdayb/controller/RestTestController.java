package com.lds.trackdayb.controller;

import java.util.List;

import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.util.ResponseCodeUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import groovyjarjarantlr4.v4.runtime.misc.Nullable;

@RestController
@RequestMapping("/rest-test")
public class RestTestController {

    static final Logger LOGGER = LoggerFactory.getLogger(RestTestController.class);

    @GetMapping("param-list")
    public ResultMVO getParamList(@RequestParam (value = "test-list", required = false) List<String> values ){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        // LOGGER.info("values test {}", values.toString());

       return resultMVO; 
    }
}
