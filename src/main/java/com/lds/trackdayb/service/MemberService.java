package com.lds.trackdayb.service;

import com.lds.trackdayb.dto.MemberDTO;

public interface MemberService {
    public String save(MemberDTO memberDTO);

    public MemberDTO login(String memberId, String password);
}
