package com.lds.trackdayb.repository;

import java.util.HashMap;
import java.util.List;

import com.lds.trackdayb.dto.MemberDTO;

import com.lds.trackdayb.entity.SnsLinkInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberRepository {
    void save(MemberDTO memberDTO);

    MemberDTO findByMemberId(String memberId);
    MemberDTO findByMemberIdAndPassword(HashMap<String, String> param);
    void updateRefreshToken(MemberDTO memberDTO);

    void upsertSnsLinkInfo(SnsLinkInfo snsLinkInfo);

    void withdrawal(String memberSerialNumber);

    MemberDTO findByLinkedEmail(String email);

    void deleteSnsLinkInfo(String memberSerialNumber);

    List<SnsLinkInfo> selectDuplicateLinkedEmailInSnsLinkInfo(String linkedEmail);
}
