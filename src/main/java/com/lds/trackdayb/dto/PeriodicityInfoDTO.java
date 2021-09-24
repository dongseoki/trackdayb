package com.lds.trackdayb.dto;

import lombok.Data;

@Data
public class PeriodicityInfoDTO {
    private String periodicityId = "";  // INT NOT NULL AUTO_INCREMENT COMMENT ''
    private String goalId = "";  // INT NOT NULL  COMMENT ''
    private String timeUnit = "";  // ENUM('D','W','M','Y') NOT NULL  COMMENT '일, 주, 월, 년 택1'
    private String type = "";  // ENUM('COUNT','DAY') NOT NULL  COMMENT '횟수 또는 요일 택 1'
    private String count = "";  // INT   COMMENT '횟수'
    private String sunYn = "";  // ENUM('Y','N')   COMMENT '일요일 체크 여부'
    private String monYn = "";  // ENUM('Y','N')   COMMENT '월요일 체크 여부'
    private String tueYn = "";  // ENUM('Y','N')   COMMENT '화요일 체크 여부'
    private String wedsYn = "";  // ENUM('Y','N')   COMMENT '수요일 체크 여부'
    private String thurYn = "";  // ENUM('Y','N')   COMMENT '목요일 체크 여부'
    private String friYn = "";  // ENUM('Y','N')   COMMENT '금요일 체크 여부'
    private String satYn = "";  // ENUM('Y','N')   COMMENT '토요일 체크 여부'
    private String createDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성일시'
    private String modificationDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '수정일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
}
