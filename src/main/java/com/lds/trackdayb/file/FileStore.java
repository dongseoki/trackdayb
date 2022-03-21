package com.lds.trackdayb.file;

import com.lds.trackdayb.entity.File;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Component
public class FileStore {
    @Value("${file.dir}")
    private String fileDir;

    public String getFullPath(String filename){
        return fileDir + filename;
    }

    public File storeFile(MultipartFile multipartFile) throws IOException {
//        String originalFilename = multipartFile.getOriginalFilename();

        // 변형. part의 name 을 이용. ex) "profilePhoto" 또는 "backgroundPhoto". etc..
        String filePartName = multipartFile.getName();

        //image.png
        String storeFileName = createStoreFileName(multipartFile.getOriginalFilename());
        int capacity = (int) multipartFile.getSize();
        multipartFile.transferTo(new java.io.File(getFullPath(storeFileName)));

        // original file 이름을 filePartName으로 덮어쓰고,
        // storeFileName은 randomUUID.[originalFileNameExt] 이다.
        return new File(filePartName, storeFileName,capacity);
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
