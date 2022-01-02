package com.lds.trackdayb.service;

import java.util.HashMap;
import java.util.Optional;

import com.lds.trackdayb.dto.MemberDTO;
import com.lds.trackdayb.dto.TokenDTO;
import com.lds.trackdayb.dto.TokenRequestDTO;
import com.lds.trackdayb.exception.DuplicateMemberException;
import com.lds.trackdayb.exception.ValidateException;
import com.lds.trackdayb.jwt.TokenProvider;
import com.lds.trackdayb.repository.MemberRepository;
import com.lds.trackdayb.util.CommonCodeUtil;
import com.lds.trackdayb.util.SecurityUtil;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl extends MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    @Override
    public String save(MemberDTO memberDTO) {
        // MessageDigest md = null;
        // try {
        // md = MessageDigest.getInstance("SHA-512");
        // } catch (NoSuchAlgorithmException e) {
        // e.printStackTrace();
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
        HashMap<String, String> param = new HashMap<>();
        param.put("memberId", memberId);
        param.put("password", password);

        return memberRepository.findByMemberIdAndPassword(param);
    }

    @Override
    public MemberDTO loadUserByUsername(String memberId) throws UsernameNotFoundException {
        // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
        MemberDTO memberDTO = memberRepository.findByMemberId(memberId);
        if (memberDTO == null || StringUtils.isEmpty(memberDTO.getMemberId())) {
            throw new UsernameNotFoundException(memberId);
        }

        return memberDTO;
    }

    @Override
    public MemberDTO signup(MemberDTO memberDTO) {
        if (!ObjectUtils.isEmpty(memberRepository.findByMemberId(memberDTO.getUsername()))) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }
        String passwordMessage = SecurityUtil.isValidPassword(memberDTO.getPassword());
        String idMessage = SecurityUtil.isValidMemberId(memberDTO.getMemberId());
        if(! StringUtils.equals(passwordMessage, CommonCodeUtil.SUCCESS)){
            throw new ValidateException(passwordMessage);
        }
        if(! StringUtils.equals(idMessage, CommonCodeUtil.SUCCESS)){
            throw new ValidateException(idMessage);
        }
        memberDTO.setAuth("ROLE_USER");
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        memberDTO.setPassword(encoder.encode(memberDTO.getPassword()));
        memberRepository.save(memberDTO);
        return memberDTO;
    }

    // public User signup(UserDto userDto) {
    // if
    // (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null)
    // != null) {
    // throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
    // }

    // //빌더 패턴의 장점
    // Authority authority = Authority.builder()
    // .authorityName("ROLE_USER")
    // .build();

    // User user = User.builder()
    // .username(userDto.getUsername())
    // .password(passwordEncoder.encode(userDto.getPassword()))
    // .nickname(userDto.getNickname())
    // .authorities(Collections.singleton(authority))
    // .activated(true)
    // .build();

    // return userRepository.save(user);
    // }

    public MemberDTO getUserWithAuthorities(String memberId) {
        return memberRepository.findByMemberId(memberId);
    }

    public MemberDTO getMyUserWithAuthorities() {

        // no jwt test code.
        // 테스트 시 아래 [1]번 주석을 풀고, 하단 [2]번을 주석처리 하시면 됩니다.
        // 테스트 완료 후 원상복구 하면 됩니다.

        // [1]
        // MemberDTO memberDTO = new MemberDTO();
        // memberDTO.setMemberSerialNumber("1");
        // return memberDTO;

        // [2]
        return memberRepository.findByMemberId(SecurityUtil.getCurrentUsername().orElse(null));
    }

    @Override
    public void updateRefreshToken(String memberId, String refreshToken) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setMemberId(memberId);
        memberDTO.setRefreshToken(refreshToken);
        memberRepository.updateRefreshToken(memberDTO);
    }

    @Override
    public TokenDTO reissue(TokenRequestDTO tokenRequestDTO) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDTO.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDTO.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        MemberDTO currentMemberDTO = memberRepository.findByMemberId(authentication.getName());

        String dbRefreshTokenValue = currentMemberDTO.getRefreshToken();

        // 3. Refresh Token 일치하는지 검사
        if (!StringUtils.equals(tokenRequestDTO.getRefreshToken(), dbRefreshTokenValue)) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 4. 새로운 토큰 생성
        TokenDTO newTokenDTO = tokenProvider.createAccessTokenOnly(authentication);

        // 5. 저장소 정보 업데이트
        MemberDTO refreshTokenUpdateParam = new MemberDTO();
        refreshTokenUpdateParam.setMemberId(currentMemberDTO.getMemberId());
        refreshTokenUpdateParam.setRefreshToken(newTokenDTO.getRefreshToken());
        memberRepository.updateRefreshToken(refreshTokenUpdateParam);

        // 토큰 발급
        return newTokenDTO;
    }

}
