package com.lds.trackdayb.service;

import java.util.HashMap;

import com.lds.trackdayb.dto.MemberDTO;
import com.lds.trackdayb.repository.MemberRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;

    @Override
    public String save(MemberDTO memberDTO) {
        // MessageDigest md = null;
        // try {
        //     md = MessageDigest.getInstance("SHA-512");
        // } catch (NoSuchAlgorithmException e) {
        //     e.printStackTrace();
        // }
        // md.update(memberDTO.getPassword().getBytes());
        // String hex = String.format("%0128x", new BigInteger(1, md.digest()));
        memberRepository.save(memberDTO);
        return memberDTO.getMemberId();
    }

    @Override
    public MemberDTO login(String memberId, String password) {
        // TODO Auto-generated method stub
        HashMap<String, String> param = new HashMap<String, String>();
        param.put("memberId", memberId);
        param.put("password", password);
        MemberDTO memberDTO = memberRepository.findByMemberIdAndPassword(param);

        return memberDTO;
    }
    
}
