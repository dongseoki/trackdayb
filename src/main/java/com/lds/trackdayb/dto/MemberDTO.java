package com.lds.trackdayb.dto;

import lombok.Data;

@Data
public class MemberDTO {
    private String memberSerialNumber = "";  // INT NOT NULL AUTO_INCREMENT COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'
    private String memberId = "";  // VARCHAR(20) NOT NULL  COMMENT '멤버 아이디'
    private String name = "";  // VARCHAR(20) NOT NULL  COMMENT '이름'
    private String phoneNumber = "";  // VARCHAR(20) NOT NULL  COMMENT '연락처'
    private String emailAddress = "";  // VARCHAR(60) NOT NULL  COMMENT '이메일 주소'
    private String snsLinkStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT 'SNS연동 여부'
    private String linkedEmail = "";  // VARCHAR(60)   COMMENT 'SNS 연동 이메일(GOOGLE, KAKAO, ...)'
    private String password = "";  // VARCHAR(255)   COMMENT '패스워드(SNS연동X시)'
    private String failCount = "";  // INT NOT NULL  COMMENT '로그인 실패 횟수'
    private String activeUserStatus = "";  // ENUM('Y','N')   COMMENT '활동 유저 여부'
    private String lastLoginDatetime = "";  // DATETIME   COMMENT '최근 로그인 일시'
    private String withdrawalDatetime = "";  // DATETIME   COMMENT '탈퇴일시'
    private String remark = "";  // TEXT   COMMENT '비고'
    private String createDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String modificationDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '수정일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
}