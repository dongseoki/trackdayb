package com.lds.trackdayb.service;

import java.util.HashMap;

import com.lds.trackdayb.dto.MemberDTO;
import com.lds.trackdayb.repository.MemberRepository;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl extends MemberService{
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

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
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
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

    @Override
    public MemberDTO loadUserByUsername(String memberId) throws UsernameNotFoundException {
        // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
        MemberDTO memberDTO = memberRepository.findByMemberId(memberId);
        if(memberDTO ==null || StringUtils.isEmpty(memberDTO.getMemberId())){
            new UsernameNotFoundException(memberId);
        }
  
        return memberDTO;
    }

    // public User signup(UserDto userDto) {
    //     if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
    //         throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
    //     }

    //     //빌더 패턴의 장점
    //     Authority authority = Authority.builder()
    //             .authorityName("ROLE_USER")
    //             .build();

    //     User user = User.builder()
    //             .username(userDto.getUsername())
    //             .password(passwordEncoder.encode(userDto.getPassword()))
    //             .nickname(userDto.getNickname())
    //             .authorities(Collections.singleton(authority))
    //             .activated(true)
    //             .build();

    //     return userRepository.save(user);
    // }

    // @Transactional(readOnly = true)
    // public Optional<User> getUserWithAuthorities(String username) {
    //     return userRepository.findOneWithAuthoritiesByUsername(username);
    // }

    // @Transactional(readOnly = true)
    // public Optional<User> getMyUserWithAuthorities() {
    //     return SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUsername);
    // }
    
}
