package com.lds.trackdayb.entity;

import lombok.Data;

@Data
public class UploadFile {
    private int fileId;
    private String originalFileName;  // VARCHAR(1000) NOT NULL  CO\MMENT '업로드 파일명'
    private String storeFileName;  // VARCHAR(1000) NOT NULL  COMMENT '저장 파일명'
    private int capacity = 0;
    private int width = 0;
    private int height = 0;
    private String createDatetime;  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT ''
    private String modificationDatetime;  // DATETIME NOT NULL DEFAULT_GENERATED COMMENT ''
    private String deletionStatus;  // ENUM('Y','N') NOT NULL  COMMENT ''

    public UploadFile(String originalFileName, String storeFileName, int capacity) {
        this.originalFileName = originalFileName;
        this.storeFileName = storeFileName;
        this.capacity = capacity;
    }

    // mybatis 사용을 위해 빈 생성자 생성이 필요함.
    public UploadFile(){

    }
}
