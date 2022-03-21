package com.lds.trackdayb.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.lds.trackdayb.entity.File;
import com.lds.trackdayb.entity.MemberEntity;

import com.lds.trackdayb.entity.SnsLinkInfo;
import com.lds.trackdayb.vo.MemberForm;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberRepository {
    void save(MemberEntity memberEntity);

    MemberEntity findByMemberId(String memberId);
    MemberEntity findByMemberIdAndPassword(HashMap<String, String> param);

    void changePassword(Map<String, String> param);

    void updateRefreshToken(MemberEntity memberEntity);

    void upsertSnsLinkInfo(SnsLinkInfo snsLinkInfo);

    void withdrawal(String memberSerialNumber);

    List<SnsLinkInfo> findAllSnsLinkInfo(String memberSerialNumber);

    MemberEntity findByLinkedEmail(String email);

    void deleteSnsLinkInfo(String memberSerialNumber);

    List<SnsLinkInfo> selectDuplicateLinkedEmailInSnsLinkInfo(String linkedEmail);

    void updateMemberTextInfo(MemberForm memberForm);

    void insertFile(File uploadFile);

    void updateMemberFileId(Map<String, Integer> updateMemberFileIdVO);
}
