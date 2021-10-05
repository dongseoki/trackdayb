package com.lds.trackdayb.controller;

import com.lds.trackdayb.dto.MemberDTO;
import com.lds.trackdayb.service.MemberService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping(value="/login")
    public String loginPage(){
      return "/member/login";
    }

    @GetMapping(value="/admin")
    public String adminPage(){
      return "/member/admin";
    }

    @GetMapping(value="/signup")
    public String signupPage(){
      return "/member/signup";
    }
    @PostMapping(value = "/signup")
    public String signup(MemberDTO memberDTO){
        memberService.save(memberDTO);
        return "redirect:/login";
    }
}
