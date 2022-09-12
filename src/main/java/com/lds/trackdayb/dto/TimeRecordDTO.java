package com.lds.trackdayb.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class TimeRecordDTO {
    private int timeRecordId ;  // INT NOT NULL  COMMENT '시간기록 ID(AUTOINCREMEANT)'
    private String selectionDate = "" ;  // DATE NOT NULL  COMMENT '선택 날짜.'
    private String modificationDatetime = "" ;  // DATETIME NOT NULL  COMMENT '수정 일시'
    private String  createDatetime = "" ;  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
    private String memberSerialNumber ;  // INT NOT NULL  COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'
}
