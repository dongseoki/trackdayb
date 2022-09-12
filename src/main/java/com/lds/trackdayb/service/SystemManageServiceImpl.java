package com.lds.trackdayb.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import com.lds.trackdayb.dto.ClassificationDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDTO;
import com.lds.trackdayb.dto.ReferenceFavoriteDefaultSettingDTO;
import com.lds.trackdayb.mvo.ReferenceFavoriteMVO;
import com.lds.trackdayb.repository.SystemManageRepository;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SystemManageServiceImpl implements SystemManageService{
    private final SystemManageRepository systemManageRepository;

    @Override
    public List<ReferenceFavoriteMVO> viewReferenceFavoriteList(String managementType, String timeUnit,String memberSerialNumber) {
        HashMap<String, String> param = new HashMap<String, String>();
        param.put("managementType", managementType);
        param.put("timeUnit", timeUnit);
        param.put("memberSerialNumber", memberSerialNumber);
        List<ReferenceFavoriteMVO> referenceFavoriteMVOs= systemManageRepository.selectReferenceFavoriteList(param);
        for(ReferenceFavoriteMVO item : referenceFavoriteMVOs){
            if(StringUtils.hasText(item.getContent())){
                // TODO 유효성 검사 필요.
                item.setRelativeTimeInfoList(Arrays.asList(item.getContent().split(",") ));
            }
        }
        return referenceFavoriteMVOs;
    }

    @Override
    public ReferenceFavoriteDefaultSettingDTO viewReferenceFavoriteDefaultSetting(String managementType,
            String timeUnit, String memberSerialNumber) {
                HashMap<String, String> param = new HashMap<String, String>();
                param.put("managementType", managementType);
                param.put("timeUnit", timeUnit);
                param.put("memberSerialNumber", memberSerialNumber);
        return systemManageRepository.selectReferenceFavoriteDefaultSetting(param);
    }

    @Override
    public List<ClassificationDTO> viewClassificationList(String managementType, String timeUnit,
            String memberSerialNumber) {
                HashMap<String, String> param = new HashMap<String, String>();
                param.put("managementType", managementType);
                param.put("timeUnit", timeUnit);
                param.put("memberSerialNumber", memberSerialNumber);
        return systemManageRepository.selectClassificationList(param);
    }

}
