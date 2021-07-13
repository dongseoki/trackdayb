package com.lds.trackdayb.dto;

public class TimeRecordDTO {
    private String timeRecordId = "";  // INT NOT NULL  COMMENT '시간기록 ID(AUTOINCREMEANT)'
    private String selectionDate = "";  // DATE NOT NULL  COMMENT '선택 날짜.'
    private String content = "";  // TEXT NOT NULL  COMMENT '내용'
    private String modificationDatetime = "";  // DATETIME NOT NULL  COMMENT '수정 일시'
    private String createDatetime = "";  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
    private String goalContent = "";  // TEXT   COMMENT ''
    private String memberSerialNumber = "";  // INT NOT NULL  COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'

    public String getTimeRecordId() {
        return timeRecordId;
    }

    public void setTimeRecordId(String timeRecordId) {
        this.timeRecordId = timeRecordId;
    }

    public String getSelectionDate() {
        return selectionDate;
    }

    public void setSelectionDate(String selectionDate) {
        this.selectionDate = selectionDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getModificationDatetime() {
        return modificationDatetime;
    }

    public void setModificationDatetime(String modificationDatetime) {
        this.modificationDatetime = modificationDatetime;
    }

    public String getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(String createDatetime) {
        this.createDatetime = createDatetime;
    }

    public String getDeletionStatus() {
        return deletionStatus;
    }

    public void setDeletionStatus(String deletionStatus) {
        this.deletionStatus = deletionStatus;
    }

    public String getGoalContent() {
        return goalContent;
    }

    public void setGoalContent(String goalContent) {
        this.goalContent = goalContent;
    }

    public String getMemberSerialNumber() {
        return memberSerialNumber;
    }

    public void setMemberSerialNumber(String memberSerialNumber) {
        this.memberSerialNumber = memberSerialNumber;
    }
}
