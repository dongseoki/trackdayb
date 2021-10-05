package com.lds.trackdayb.service;

import java.util.List;

import com.lds.trackdayb.dto.MemberDTO;
import com.lds.trackdayb.repository.MemberRepository;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService implements UserDetailsService{
    private final MemberRepository memberRepository;
    /**
   * Spring Security 필수 메소드 구현
   *
   * @param mbrId 멤버 ID
   * @return MemberDTO
   * @throws UsernameNotFoundException 유저가 없을 때 예외 발생
   */
    
  @Override
  public MemberDTO loadUserByUsername(String memberId) throws UsernameNotFoundException {
      // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
      MemberDTO memberDTO = memberRepository.findByMemberId(memberId);
      if(memberDTO ==null || StringUtils.isEmpty(memberDTO.getMemberId())){
          new UsernameNotFoundException(memberId);
      }

      return memberDTO;
  }

    /**
     * 회원정보 저장
     *
     * @param infoDto 회원정보가 들어있는 DTO
     * @return 저장되는 회원의 PK
     */
    public String save(MemberDTO memberDTO) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
    memberRepository.save(memberDTO);
    return memberDTO.getMemberId();
    }
}
