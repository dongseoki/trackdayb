package com.lds.trackdayb.controller;

import java.util.List;

import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.repository.GoalManageRepository;
import com.lds.trackdayb.util.ResponseCodeUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@RestController
@RequestMapping("/rest-test")
public class RestTestController {

    private final GoalManageRepository goalManageRepository;
    static final Logger LOGGER = LoggerFactory.getLogger(RestTestController.class);

    @GetMapping("param-list")
    public ResultMVO getParamList(@RequestParam (value = "test-list", required = false) List<String> values ){
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        // LOGGER.info("values test {}", values.toString());

       return resultMVO; 
    }

    @GetMapping(value="/argListTest")
    public String argListTest(){
      String[] args = {"1","2 ","3"};
      
      return goalManageRepository.argListTest(args);
    }
}
