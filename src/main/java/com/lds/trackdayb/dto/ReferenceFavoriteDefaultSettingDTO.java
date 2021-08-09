package com.lds.trackdayb.dto;

import lombok.Data;

@Data
public class ReferenceFavoriteDefaultSettingDTO {
    private String serialNumber = "";  // INT NOT NULL  COMMENT '일련번호'
    private String managementType = "";  // ENUM('TIME_RECORD','TIMELY_INDICATORS_RECORD') NOT NULL  COMMENT '관리 종류'
    private String timeUnit = "";  // ENUM('DAY','WEEK','MONTH','QUARTER','YEAR') NOT NULL  COMMENT '시간 단위'
    private String referenceFavoriteId = "";  // INT   COMMENT '널값허용. 참조 즐겨찾기 ID 외래키'
    private String createDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String updateDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '수정 일시'
    private String memberSerialNumber = "";  // INT NOT NULL  COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'
}
