package com.lds.trackdayb;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

// example

// <if test="startDatetime != null and !startDatetime.equals('')">
//     start_datetime,
// </if>

// <if test="startDatetime != null and !startDatetime.equals('')">
//     #{startDatetime},
// </if>

public class mybatisIFTagMakerForUpdate {
    public static String camelCaseToUnderscores(String camel) {
        String underscore;/*from w w w  . ja  v  a 2  s. c  o  m*/
        underscore = String.valueOf(Character.toLowerCase(camel.charAt(0)));
        for (int i = 1; i < camel.length(); i++) {
            underscore += Character.isLowerCase(camel.charAt(i)) ? String
                    .valueOf(camel.charAt(i))
                    : "_"
                            + String.valueOf(Character.toLowerCase(camel
                                    .charAt(i)));
        }
        return underscore;
    }
    public static void main(String[] args) throws IOException {
        System.out.println("heelo");

        ArrayList<String> camelCaseList = new ArrayList<String>();
        // String[] camelCaseStrArr = {"startDatetime", "endDatetime", "progressRate", "color"};
        String[] camelCaseStrArr = {"memberSerialNumber", "goalId", "title", "startDatetime", "endDatetime", "content", "activityScore", "shareStatus"};
        camelCaseList = new ArrayList<>(Arrays.asList(camelCaseStrArr));
// 출처: https://mommoo.tistory.com/32 [개발자로 홀로 서기]

        // camelCaseList.add("startDatetime");


        String str1 ="<if test=\"camelStr != null and !camelStr.equals('')\">";

        for(String camelStr : camelCaseList){
            String snakeStr = camelCaseToUnderscores(camelStr);
            System.out.println(str1.replaceAll("camelStr", camelStr));
            String str2 = "\tcamelStr,";
            System.out.println(str2.replaceAll("camelStr", snakeStr));
            System.out.println("</if>");
            // System.out.println();
        }
        System.out.println("\n-------------------\n");
        for(String camelStr : camelCaseList){
            String snakeStr = camelCaseToUnderscores(camelStr);
            System.out.println(str1.replaceAll("camelStr", camelStr));
            String str2 = "\t,snakeStr = #{camelStr}";
            System.out.println(str2.replaceAll("camelStr", camelStr).replaceAll("snakeStr", snakeStr));
            System.out.println("</if>");
            // System.out.println();
        }
// 출처: https://hianna.tistory.com/587 [어제 오늘 내일]
    }
}
