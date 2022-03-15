package com.lds.trackdayb.service;

import com.lds.trackdayb.entity.MemberEntity;

import java.util.List;
import java.util.Map;

public interface TestService {
    List<Map<String, Object>> getCitys();
    String selectLoginMemberSerialNumber();

    void editTest(MemberEntity memberEntity);
}
