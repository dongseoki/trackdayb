package com.lds.trackdayb.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class ActivityRecordDTO {
    private int timeActivityRecordId;  // INT NOT NULL  COMMENT '활동 기록 ID'
    private String startDatetime = "";  // DATETIME NOT NULL  COMMENT '시작 시간값.(시분)'
    private String endDatetime= "";  // DATETIME NOT NULL  COMMENT '종료 시간.(시분) 비고  선택 화면에 다음날짜의 시간까지 선택 가능'
    private String classificationName = "";  // VARCHAR(30) NOT NULL  COMMENT '분류'
    private String activityContent = "";  // TEXT NOT NULL  COMMENT '활동 내용'
    private String goalContent = "";  // TEXT   COMMENT '목표 내용'
    private String outcomeContent = "";  // TEXT NOT NULL  COMMENT '활동내역'
    private String reflectionContent = "";  // TEXT NOT NULL  COMMENT '반성내용'
    private int activityScore = 0;  // INT   COMMENT '활동점수(집중도)'
    private String modificationDatetime= "";  // DATETIME NOT NULL  COMMENT '수정 일시'
    private String createDatetime= "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
    private int timeRecordId;  // INT NOT NULL  COMMENT '시간기록 ID(AUTOINCREMEANT)'
}
