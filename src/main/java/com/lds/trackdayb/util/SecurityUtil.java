package com.lds.trackdayb.util;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtil {
    private static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

    private SecurityUtil() {
    }

    public static Optional<String> getCurrentUsername() {
       final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
 
       if (authentication == null) {
          logger.debug("Security Context에 인증 정보가 없습니다.");
          return Optional.empty();
       }
 
       String username = null;
       if (authentication.getPrincipal() instanceof UserDetails) {
          UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
          username = springSecurityUser.getUsername();
       } else if (authentication.getPrincipal() instanceof String) {
          username = (String) authentication.getPrincipal();
       }
 
       return Optional.ofNullable(username);
    }

    public static String isValidMemberId(String memberId){
       if(memberId == null || memberId.length()<CommonCodeUtil.MEMBER_ID_MIN_LENGTH || memberId.length()>CommonCodeUtil.MEMBER_ID_MAX_LENGTH){
          return "아이디는 "+CommonCodeUtil.MEMBER_ID_MIN_LENGTH +"자리 이상 "+CommonCodeUtil.MEMBER_ID_MAX_LENGTH+"자리 이하여야 합니다.";
       }
       return CommonCodeUtil.SUCCESS;

    }

    public static String isValidPassword(String password){
         if(password.length() < CommonCodeUtil.MEMBER_PASSWORD_MIN_LENGTH || password.length() > CommonCodeUtil.MEMBER_PASSWORD_MAX_LENGTH){
               return "비밀번호는 "+CommonCodeUtil.MEMBER_PASSWORD_MIN_LENGTH+"자 이상이 "+CommonCodeUtil.MEMBER_PASSWORD_MAX_LENGTH+"자 이하여야 합니다.";
         }else if(!password.matches(".*[a-zA-Z]+.*")){
               return "비밀번호는 영문자를 포함해야 합니다.";
         }else if(!password.matches(".*[0-9]+.*")){
               return "비밀번호는 숫자를 포함해야 합니다.";
         }
         // if(!password.matches(".*[~!@#$%^&*()_+|<>?:{}]+.*")){
         //       return "비밀번호는 특수문자를 포함해야 합니다.";
         // }
         if (containsSpecialChar(password) == false) {
            return "비밀번호는 특수문자를 포함해야 합니다.";
         }
         return CommonCodeUtil.SUCCESS;
    }
    public static boolean containsSpecialChar(String value) { 
       String specialChars = "~․!@#$%^&*()_-+={}[]|\\;:'\"<>,.?/"; 
       for (int i = 0; i < specialChars.length(); i++) {
           if (value.indexOf(specialChars.charAt(i)) > -1) { 
              return true; 
            } 
      }
      return false; 
   }
}
