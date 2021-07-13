package com.lds.trackdayb.service;

import org.springframework.stereotype.Service;

@Service
public class MainServiceImpl implements MainService {

    @Override
    public String enterMain() {
        return "안녕하세요 메인 페이지 입니다.";
    }
}
