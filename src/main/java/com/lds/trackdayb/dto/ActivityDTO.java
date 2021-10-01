package com.lds.trackdayb.dto;

import lombok.Data;

@Data
public class ActivityDTO {
    private String activityId = "";  // INT NOT NULL AUTO_INCREMENT COMMENT '활동 기록 ID'
    private String memberSerialNumber = "";  // INT NOT NULL  COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'
    private String goalId = "";  // INT   COMMENT ''
    private String title = "";  // VARCHAR(50) NOT NULL  COMMENT '제목'
    private String startDatetime = "";  // DATETIME NOT NULL  COMMENT '시작 시간값.(시분)'
    private String endDatetime = "";  // DATETIME NOT NULL  COMMENT '종료 시간.(시분) 비고 선택 화면에 다음날짜의 시간까지 선택 가능'
    private String content = "";  // TEXT   COMMENT '활동 내용'
    private String activityScore = "";  // INT   COMMENT '활동점수(집중도)'
    private String shareStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '공유여부'
    private String createDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String modificationDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '수정 일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
}
