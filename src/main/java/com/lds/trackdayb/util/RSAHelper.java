package com.lds.trackdayb.util;

import com.lds.trackdayb.dto.MemberDTO;

import javax.crypto.Cipher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.PrivateKey;
import java.util.Base64;

public class RSAHelper {
    static public MemberDTO RSApreprocess(HttpServletRequest request, MemberDTO memberDTO) throws Exception {
        HttpSession session = request.getSession();
        PrivateKey privateKey = (PrivateKey) session.getAttribute("__rsaPrivateKey__");
        session.removeAttribute("__rsaPrivateKey__"); // 키의 재사용을 막는다. 항상 새로운 키를 받도록 강제.
        if (privateKey == null) {
            throw new RuntimeException("암호화 비밀키 정보를 찾을 수 없습니다.");
        }
        String decodedMemberId = decryptRsa(privateKey, memberDTO.getMemberId());
        String decodedPassword = decryptRsa(privateKey, memberDTO.getPassword());
        memberDTO.setMemberId(decodedMemberId);
        memberDTO.setPassword(decodedPassword);
        return memberDTO;
    }

    static private String decryptRsa(PrivateKey privateKey, String securedValue) throws Exception {
        System.out.println("will decrypt : " + securedValue);
        Cipher cipher = Cipher.getInstance("RSA");

        byte[] encryptedBytes = Base64.getDecoder().decode(securedValue);;
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        String decryptedValue = new String(decryptedBytes, "utf-8"); // 문자 인코딩 주의.
        return decryptedValue;
    }
}
