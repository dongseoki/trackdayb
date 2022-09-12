package com.lds.trackdayb.service;

import java.util.List;

import com.lds.trackdayb.dto.ClassificationDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDefaultSettingDTO;
import com.lds.trackdayb.mvo.ReferenceFavoriteMVO;

public interface SystemManageService {

    List<ReferenceFavoriteMVO> viewReferenceFavoriteList(String managementType, String timeUnit,String memberSerialNumber);
    ReferenceFavoriteDefaultSettingDTO viewReferenceFavoriteDefaultSetting(String managementType, String timeUnit,String memberSerialNumber);
    List<ClassificationDTO> viewClassificationList(String managementType, String timeUnit,String memberSerialNumber);
    
}
