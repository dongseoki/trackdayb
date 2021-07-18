package com.lds.trackdayb.dto;

import java.sql.Date;

public class TimeRecordDTO {
    private String timeRecordId = "";  // INT NOT NULL  COMMENT '시간기록 ID(AUTOINCREMEANT)'
    private Date selectionDate ;  // DATE NOT NULL  COMMENT '선택 날짜.'
    private Date modificationDatetime ;  // DATETIME NOT NULL  COMMENT '수정 일시'
    private Date createDatetime ;  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT '생성 일시'
    private String deletionStatus = "";  // ENUM('Y','N') NOT NULL  COMMENT '삭제여부'
    private int memberSerialNumber ;  // INT NOT NULL  COMMENT '멤버테이블 일련번호(AUTOINCREAMENT)'

    public String getTimeRecordId() {
        return timeRecordId;
    }

    public void setTimeRecordId(String timeRecordId) {
        this.timeRecordId = timeRecordId;
    }


    public String getDeletionStatus() {
        return deletionStatus;
    }

    public void setDeletionStatus(String deletionStatus) {
        this.deletionStatus = deletionStatus;
    }

    public int getMemberSerialNumber() {
        return memberSerialNumber;
    }

    public void setMemberSerialNumber(int memberSerialNumber) {
        this.memberSerialNumber = memberSerialNumber;
    }

    public Date getSelectionDate() {
        return selectionDate;
    }

    public void setSelectionDate(Date selectionDate) {
        this.selectionDate = selectionDate;
    }

    public Date getModificationDatetime() {
        return modificationDatetime;
    }

    public void setModificationDatetime(Date modificationDatetime) {
        this.modificationDatetime = modificationDatetime;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }
}
