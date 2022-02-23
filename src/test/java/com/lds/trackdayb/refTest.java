package com.lds.trackdayb;

import com.lds.trackdayb.entity.MemberEntity;

public class refTest {
    public static void main(String[] args) {
//        System.out.println("");
//
        MemberEntity test = new MemberEntity();
        test.setPassword("test1");
        System.out.println("test.getPassword() = " + test.getPassword());

        changeMemberPwd(test);
        System.out.println("test.getPassword() = " + test.getPassword());

        MemberEntity[] memberEntities = {new MemberEntity()};
        memberEntities[0].setPassword("test1");
        System.out.println("memberDTOS[0].getPassword() = " + memberEntities[0].getPassword());
        changeMemberPwd2(memberEntities);
        System.out.println("memberDTOS[0].getPassword() = " + memberEntities[0].getPassword());
    }

    private static void changeMemberPwd2(MemberEntity[] memberEntities) {
        memberEntities[0].setPassword("test2");
    }

    public static void changeMemberPwd(MemberEntity memberEntity){
        memberEntity.setPassword("test2");
    }
}
