package com.lds.trackdayb.mybatis;

import com.lds.trackdayb.TrackdaybApplication;
import com.lds.trackdayb.entity.SnsLinkInfo;
import com.lds.trackdayb.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;

//@AutoConfigureTestDatabase
//@ExtendWith(SpringRunner.class)
@MybatisTest
public class upsertSnsLinkInfoTest {
//    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(TrackdaybApplication.class);

//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Test
//    void test(){
////        MemberRepository memberRepository = ac.getBean("memberRepository", MemberRepository.class);
//
//        SnsLinkInfo snsLinkInfo = new SnsLinkInfo();
//        snsLinkInfo.setMemberSerialNumber("1");
//        snsLinkInfo.setSnsType("G");
//        snsLinkInfo.setLinkedEmail("test7");
//        memberRepository.upsertSnsLinkInfo(snsLinkInfo);
//        System.out.println("test finish");
//    }
}
