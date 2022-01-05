package com.lds.trackdayb.dto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;

@Data
public class MemberDTO implements UserDetails {
    private String memberSerialNumber = "";  // INT NOT NULL AUTO_INCREMENT COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'
    private String auth = ""; // 권한.
    private String memberId = "";  // VARCHAR(20) NOT NULL  COMMENT '멤버 아이디'
    private String name = "";  // VARCHAR(20) NOT NULL  COMMENT '이름'
    private String phoneNumber = "";  // VARCHAR(20) NOT NULL  COMMENT '연락처'
    private String emailAddress = "";  // VARCHAR(60) NOT NULL  COMMENT '이메일 주소'
    private String introduction = "";  // VARCHAR(255)   COMMENT '소개말'
    private String profilePhotoId = "";  // INT   COMMENT '멤버페이지나 커뮤니티 페이지에서 보일 썸네일 프로필 사진 FILE ID'
    private String backgroundPhotoId = "";  // INT   COMMENT '멤버페이지나 커뮤니티 페이지에서 보일 배경 사진 FILE ID'
    private String snsLinkStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT 'SNS연동 여부'
    private String linkedEmail = "";  // VARCHAR(60)   COMMENT 'SNS 연동 이메일(GOOGLE, KAKAO, ...)'
    private String password = "";  // VARCHAR(255)   COMMENT '패스워드(SNS연동X시)'
    private String failCount = "";  // INT NOT NULL  COMMENT '로그인 실패 횟수'
    private String activeUserStatus = "";  // ENUM('Y','N')   COMMENT '활동 유저 여부'
    private String lastLoginDatetime = "";  // DATETIME   COMMENT '최근 로그인 일시'
    private String refreshToken = "";  // VARCHAR(1000)   COMMENT '리프래시_토큰_값'
    private String withdrawalDatetime = "";  // DATETIME   COMMENT '탈퇴일시'
    private String remark = "";  // TEXT   COMMENT '비고'
    private String createDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String modificationDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '수정일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> roles = new HashSet<>();
        for (String role : auth.split(",")) {
          roles.add(new SimpleGrantedAuthority(role));
        }
        return roles;
    }
    @Override
    public String getPassword(){
        return password;
    }
    @Override
    public String getUsername() {
        return memberId;
    }
    @Override
    public boolean isAccountNonExpired() {
        // // TODO Auto-generated method stub
        // return false;
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        // // TODO Auto-generated method stub
        // return false;
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        // // TODO Auto-generated method stub
        // return false;
        return true;
    }
    @Override
    public boolean isEnabled() {
        // // TODO Auto-generated method stub
        // return false;
        return true;
    }
}
