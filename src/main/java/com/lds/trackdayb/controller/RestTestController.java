package com.lds.trackdayb.controller;

import java.util.List;

import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.repository.GoalManageRepository;
import com.lds.trackdayb.util.ResponseCodeUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value="/typetest")
    public String typeTest(@RequestParam("intData")int intData, @RequestParam("booleanData")boolean booleanData, @RequestParam("doubleDataObj")Double doubleDataObj){
        LOGGER.debug("typeTest - intData : {}, booleanData : {}, doubleDataObj : {}", intData,booleanData,doubleDataObj);
        return "success";

    }
    @PostMapping(value="/typetest2-form")
    public String typeTest2form(@RequestParam("intData")int intData, @RequestParam("booleanData")boolean booleanData, @RequestParam("doubleDataObj")Double doubleDataObj){
        LOGGER.debug("typeTest - typeTest2form intData : {}, booleanData : {}, doubleDataObj : {}", intData,booleanData,doubleDataObj);
        return "success";
    }

    @PostMapping(value="/typetest3-requestbody")
    public String typeTest3RequestBody(@RequestBody TypeTestVO typeTestVO){
        LOGGER.debug("typeTest - typeTest3RequestBody intData : {}, booleanData : {}, doubleDataObj : {}", typeTestVO.getIntData(),typeTestVO.isBooleanData(),typeTestVO.getDoubleDataObj());
        return "success";

    }

//    public static class TypeTestVO {
//        int intData;
//        boolean booleanData;
//        Double doubleDataObj;
//    }
}
