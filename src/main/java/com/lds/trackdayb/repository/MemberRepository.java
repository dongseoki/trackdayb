package com.lds.trackdayb.repository;

import java.util.HashMap;

import com.lds.trackdayb.dto.MemberDTO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberRepository {
    void save(MemberDTO memberDTO);

    MemberDTO findByMemberIdAndPassword(HashMap<String, String> param);
}
