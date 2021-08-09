package com.lds.trackdayb.dto;

import lombok.Data;

@Data
public class ClassificationDTO {
    private String classificationId = "";  // INT NOT NULL  COMMENT '분류 ID(AUTOINCREMEANT)'
    private String managementType = "";  // ENUM('TIME_RECORD','TIMELY_INDICATORS_RECORD') NOT NULL  COMMENT '관리 종류'
    private String timeUnit = "";  // ENUM('DAY','WEEK','MONTH','QUARTER','YEAR') NOT NULL  COMMENT '시간 단위'
    private String name = "";  // VARCHAR(30) NOT NULL  COMMENT '분류명(UNIQUE)'
    private String explanation = "";  // TEXT NOT NULL  COMMENT '설명'
    private String modificationDatetime = "";  // DATETIME NOT NULL  COMMENT '수정 일시'
    private String createDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
    private String memberSerialNumber = "";  // INT NOT NULL  COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'
}
