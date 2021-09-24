package com.lds.trackdayb.dto;

import lombok.Data;

@Data
public class GoalDTO {
    private String goalId = "";  // INT NOT NULL AUTO_INCREMENT COMMENT ''
    private String parentId = "";  // INT   COMMENT ''
    private String memberSerialNumber = "";  // INT NOT NULL  COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'
    private String title = "";  // VARCHAR(50) NOT NULL  COMMENT '제목'
    private String kind = "";  // ENUM('DEADLINE','REGULAR') NOT NULL  COMMENT '주기성, 기한성 목표 구분'
    private String content = "";  // TEXT NOT NULL  COMMENT '내용'
    private String startDatetime = "";  // DATETIME   COMMENT '시작일'
    private String endDatetime = "";  // DATETIME   COMMENT '종료일'
    private String progressRate = "";  // INT   COMMENT '진행율(주기성 목표의 경우 NULL 가능)'
    private String color = "";  // VARCHAR(10)   COMMENT '컬러정보(최상위 목표 이외 NULL또는 빈값)'
    private String createDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성일시'
    private String modificationDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '수정일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
}
