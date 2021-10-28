package com.lds.trackdayb.service;

import com.lds.trackdayb.dto.MemberDTO;

import org.springframework.security.core.userdetails.UserDetailsService;

public abstract class MemberService implements UserDetailsService{
    public abstract String save(MemberDTO memberDTO);

    public abstract MemberDTO login(String memberId, String password);
}
