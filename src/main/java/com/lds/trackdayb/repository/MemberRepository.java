package com.lds.trackdayb.repository;

import com.lds.trackdayb.dto.MemberDTO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberRepository {
    MemberDTO findByMemberId(String memberId);

    void save(MemberDTO memberDTO);
}
