package com.lds.trackdayb;

import java.math.BigInteger;
import java.security.MessageDigest;

public class EncryptionTest {
    // 128 크기
    public static String getSHA512(String input){

        String toReturn = null;

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-512");
            digest.reset();
            digest.update(input.getBytes("utf8"));
            toReturn = String.format("%0128x", new BigInteger(1, digest.digest()));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return toReturn;

    }

    public static void main(String[] args) {

        System.out.println(getSHA512("Hello"));
        System.out.println(getSHA512("test"));
        System.out.println(getSHA512("Hello"));
        System.out.println(getSHA512("A"));
        System.out.println(getSHA512("B"));
        System.out.println(getSHA512("C"));


    }
}
