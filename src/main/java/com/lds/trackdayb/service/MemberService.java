package com.lds.trackdayb.service;

import com.lds.trackdayb.dto.MemberInfo;
import com.lds.trackdayb.dto.PasswordChangeDTO;
import com.lds.trackdayb.entity.MemberEntity;

import com.lds.trackdayb.dto.TokenDTO;
import com.lds.trackdayb.dto.TokenRequestDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;

public abstract class MemberService implements UserDetailsService{
    public abstract String save(MemberEntity memberEntity);

    public abstract MemberEntity login(String memberId, String password);

    public abstract TokenDTO signup(HttpServletRequest request, MemberEntity memberEntity) throws  Exception;

    public abstract Authentication springSecurityUsernamePasswordAuthenticate(String memberId, String decodedPassword) throws Exception;

    public abstract MemberEntity getUserWithAuthorities(String memberId);

    public abstract MemberInfo getMyUserWithAuthorities();

    public abstract void updateRefreshToken(String memberId,String refreshToken);

    public abstract TokenDTO reissue(TokenRequestDTO tokenRequestDTO);

    public abstract String googleAuthServerAuthenticate(String tokenId) throws Exception;
    public abstract MemberEntity simplesignup(MemberEntity memberEntity, String snsName, String linkedEmail) throws Exception;

    public abstract Authentication springSecurityOauth2Authenticate(String memberId);

    public abstract void linkAccount(MemberInfo memberInfo, String snsName, String email) throws Exception;

    public abstract void withdrawal(String memberSerialNumber) throws Exception;

    public abstract MemberEntity snslogin(String email) throws Exception ;

    public abstract TokenDTO idPwdLogin(HttpServletRequest request, MemberEntity memberEntity) throws Exception;

    public abstract void RSApreprocessTest2(HttpServletRequest request, MemberEntity memberEntity) throws Exception;

    public abstract void changePassword(HttpServletRequest request, PasswordChangeDTO passwordChangeDTO, MemberInfo memberInfo) throws Exception;
}
