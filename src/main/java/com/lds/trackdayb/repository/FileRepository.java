package com.lds.trackdayb.repository;

import com.lds.trackdayb.entity.File;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FileRepository {
    File getFileInfo(String photoId);
}
