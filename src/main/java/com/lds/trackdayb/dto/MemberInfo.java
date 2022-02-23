package com.lds.trackdayb.dto;

import com.lds.trackdayb.entity.SnsLinkInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberInfo {
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
    private List<SnsLinkInfo> snsLinkInfoList;
}
