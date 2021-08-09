package com.lds.trackdayb.repository;

import java.util.HashMap;
import java.util.List;

import com.lds.trackdayb.dto.ClassificationDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDefaultSettingDTO;
import com.lds.trackdayb.mvo.ReferenceFavoriteMVO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface SystemManageRepository {

    List<ReferenceFavoriteMVO> selectReferenceFavoriteList(HashMap<String, String> param);

    ReferenceFavoriteDefaultSettingDTO selectReferenceFavoriteDefaultSetting(HashMap<String, String> param);

    List<ClassificationDTO> selectClassificationList(HashMap<String, String> param);
    
}
