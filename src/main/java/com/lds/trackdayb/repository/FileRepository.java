package com.lds.trackdayb.repository;

import com.lds.trackdayb.entity.UploadFile;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FileRepository {
    UploadFile getFileInfo(String photoId);
}
