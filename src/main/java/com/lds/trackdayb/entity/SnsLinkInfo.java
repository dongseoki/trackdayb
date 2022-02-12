package com.lds.trackdayb.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SnsLinkInfo {
    private String memberSerialNumber;  // INT NOT NULL  COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'
    private String snsType;  // ENUM('G','N','K') NOT NULL  COMMENT 'SNS 타입코드 - G:구글, N:네이버, K:카카오'
    private String linkedEmail;  // VARCHAR(50) NOT NULL  COMMENT 'SNS 연동 이메일'
    private String modificationDatetime;  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '수정일시'
}
