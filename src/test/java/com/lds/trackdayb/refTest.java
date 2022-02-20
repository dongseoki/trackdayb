package com.lds.trackdayb;

import com.lds.trackdayb.dto.MemberDTO;

public class refTest {
    public static void main(String[] args) {
//        System.out.println("");
//
        MemberDTO test = new MemberDTO();
        test.setPassword("test1");
        System.out.println("test.getPassword() = " + test.getPassword());

        changeMemberPwd(test);
        System.out.println("test.getPassword() = " + test.getPassword());

        MemberDTO[] memberDTOS = {new MemberDTO()};
        memberDTOS[0].setPassword("test1");
        System.out.println("memberDTOS[0].getPassword() = " + memberDTOS[0].getPassword());
        changeMemberPwd2(memberDTOS);
        System.out.println("memberDTOS[0].getPassword() = " + memberDTOS[0].getPassword());
    }

    private static void changeMemberPwd2(MemberDTO[] memberDTOS) {
        memberDTOS[0].setPassword("test2");
    }

    public static void changeMemberPwd(MemberDTO memberDTO){
        memberDTO.setPassword("test2");
    }
}
