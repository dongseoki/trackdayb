package com.lds.trackdayb.service;

import java.util.Optional;

import com.lds.trackdayb.dto.MemberDTO;

import com.lds.trackdayb.dto.TokenDTO;
import com.lds.trackdayb.dto.TokenRequestDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public abstract class MemberService implements UserDetailsService{
    public abstract String save(MemberDTO memberDTO);

    public abstract MemberDTO login(String memberId, String password);

    public abstract MemberDTO signup(MemberDTO memberDTO);

    public abstract MemberDTO getUserWithAuthorities(String memberId);

    public abstract MemberDTO getMyUserWithAuthorities();

    public abstract void updateRefreshToken(String memberId,String refreshToken);

    public abstract TokenDTO reissue(TokenRequestDTO tokenRequestDTO);
}
