package com.lds.trackdayb.service;

import com.lds.trackdayb.dto.MemberDTO;

import com.lds.trackdayb.dto.TokenDTO;
import com.lds.trackdayb.dto.TokenRequestDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;

public abstract class MemberService implements UserDetailsService{
    public abstract String save(MemberDTO memberDTO);

    public abstract MemberDTO login(String memberId, String password);

    public abstract TokenDTO signup(HttpServletRequest request,MemberDTO memberDTO) throws  Exception;

    public abstract Authentication springSecurityUsernamePasswordAuthenticate(String memberId, String decodedPassword) throws Exception;

    public abstract MemberDTO getUserWithAuthorities(String memberId);

    public abstract MemberDTO getMyUserWithAuthorities();

    public abstract void updateRefreshToken(String memberId,String refreshToken);

    public abstract TokenDTO reissue(TokenRequestDTO tokenRequestDTO);

    public abstract String googleAuthServerAuthenticate(String tokenId) throws Exception;
    public abstract MemberDTO simplesignup(MemberDTO memberDTO, String snsName,String linkedEmail) throws Exception;

    public abstract Authentication springSecurityOauth2Authenticate(String memberId);

    public abstract void linkAccount(MemberDTO memberDTO, String snsName, String email) throws Exception;

    public abstract void withdrawal(String memberSerialNumber) throws Exception;

    public abstract MemberDTO snslogin(String email) throws Exception ;

    public abstract TokenDTO idPwdLogin(HttpServletRequest request, MemberDTO memberDTO) throws Exception;
}
