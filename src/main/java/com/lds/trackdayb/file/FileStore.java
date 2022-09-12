package com.lds.trackdayb.file;

import com.lds.trackdayb.controller.TimeManageController;
import com.lds.trackdayb.entity.UploadFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Component
public class FileStore {
    private String fileDirProperty;
    private String fileAbsolutePathYnProperty;
    private String fileDir;
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    public FileStore(@Value("${file.dir}") String fileDirProperty, @Value("${file.absolute-path-yn}") String fileAbsolutePathYnProperty, @Value("${file.default-dir}") String fileDefaultDirProperty) {
        this.fileDirProperty = fileDirProperty;
        this.fileAbsolutePathYnProperty = fileAbsolutePathYnProperty;
        if(StringUtils.equals(fileAbsolutePathYnProperty,"Y") && !StringUtils.isEmpty(fileDirProperty))
            this.fileDir=fileDirProperty;
        else
            this.fileDir=System.getProperty("user.dir")+ File.separator + fileDefaultDirProperty + File.separator;
        LOGGER.info("fileDir = ", this.fileDir);
    }

    public String getFullPath(String filename){
        return fileDir + filename;
    }

    public UploadFile storeFile(MultipartFile multipartFile) throws IOException {
        // 변형. part의 name 을 이용. ex) "profilePhoto" 또는 "backgroundPhoto". etc..
        String filePartName = multipartFile.getName();

        //image.png
        String storeFileName = createStoreFileName(multipartFile.getOriginalFilename());
        int capacity = (int) multipartFile.getSize();
        multipartFile.transferTo(new java.io.File(getFullPath(storeFileName)));

        // original file 이름을 filePartName으로 덮어쓰고,
        // storeFileName은 randomUUID.[originalFileNameExt] 이다.
        return new UploadFile(filePartName, storeFileName,capacity);
    }

    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        String storeFileName = uuid+ '.' + ext;

        return storeFileName;
    }

    private String extractExt(String originalFileName){
        int pos = originalFileName.lastIndexOf(".");
        return originalFileName.substring(pos+1);
    }
}