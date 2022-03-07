package com.lds.trackdayb.controller;

import com.lds.trackdayb.mvo.ResultMVO;
import com.lds.trackdayb.repository.GoalManageRepository;
import com.lds.trackdayb.service.TestService;

import com.lds.trackdayb.util.ResponseCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;

// @RestController
// public class TestController {
//     @Autowired
//     private TestService testService;

//     @GetMapping("/v1/board")
//     public List<Map<String, Object>> getCitys() {
//         return testService.getCitys();
//     }
// }

@RequiredArgsConstructor
@Controller
@RequestMapping("/test")
public class TestController {
    @Value("${sns.google.client-id}")
    private String SNS_GOOGLE_CLIENT_ID;

    @Value("${sns.google.client-secret}")
    private String SNS_GOOGLE_CLIENT_SECRET;

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    private final TestService testService;

    @GetMapping("/testPage")
    public String testPage() {
        return "/test/testPage";
    }

    @GetMapping("/testLogoutPage")
    public String testLogoutPage() {
        return "/test/testLogoutPage";
    }

    @GetMapping(value="/login")
    public String loginPage(ModelMap model){
      model.addAttribute("snsGoogleCliendId", SNS_GOOGLE_CLIENT_ID);
      return "/test/login";
    }

    @PostMapping(value = "/uploadservlet")
    @ResponseBody
    public ResponseEntity<ResultMVO> saveFile(HttpServletRequest request) throws ServletException, IOException {
        //특정 항목을 따로 뽑아낼 수 있다.
        String itemName = request.getParameter("itemName");

        //.getParts()로 모든 항목들을 collection형식으로 받을 수 있다.
        Collection<Part> parts = request.getParts();
        for (Part part : parts) {
            //form에서 지정한 name을 받을 수 있다.
            LOGGER.info("name={}", part.getName());

            //각 항목마다 따로 존재하는 헤더값들을 collection으로 받을 수 있다.
            Collection<String> headerNames = part.getHeaderNames();
            for (String headerName : headerNames) { //각 항목 헤더들 출력
                LOGGER.info("header {}: {}", headerName, part.getHeader(headerName));
            }

            //파일의 오리지널 이름을 얻을 수 있다. 파일이 아닌 그냥 문자의 경우 null이다.
            LOGGER.info("submittedFileName={}", part.getSubmittedFileName());
            LOGGER.info("size={}", part.getSize()); //각 파트의 사이즈를 얻을 수 있다.

            InputStream inputStream = part.getInputStream(); //데이터 읽기
            String fullPath = "C:\\work\\upload\\" + part.getSubmittedFileName();
            part.write(fullPath); //경로만 지정해주면 파일을 저장할 수 있다.
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        ResultMVO resultMVO = new ResultMVO();
        resultMVO.setResultCode(ResponseCodeUtil.RESULT_CODE_SUCESS);
        return new ResponseEntity<>(resultMVO, httpHeaders, HttpStatus.BAD_REQUEST);
    }



    @GetMapping(value="/signup")
    public String signupPage(){
      return "/test/signup";
    }



}
