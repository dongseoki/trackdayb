package com.lds.trackdayb.service;

import com.lds.trackdayb.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TestServiceImpl implements TestService{
    @Autowired
    private TestRepository testRepository;

    @Override
    public List<Map<String, Object>> getCitys() {
        return testRepository.getCitys();
    }

    @Override
    public int selectLoginMemberSerialNumber() {
        // FIXME 제대로된 것으로 바꾸자.
        return 1;
    }
}
