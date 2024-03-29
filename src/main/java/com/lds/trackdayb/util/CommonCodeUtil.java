package com.lds.trackdayb.util;
import java.awt.Color;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public final class CommonCodeUtil {
    public static String TIME_RECORD = "time_record";
    public static String TIMELY_INDICATORS_RECORD = "timely_indicators_record";

    public static String TIME_UNIT_DAY = "D";
    public static String TIME_UNIT_WEEK = "W";
    public static String TIME_UNIT_MONTH = "M";
    public static String TIME_UNIT_QUATER = "Q";
    public static String TIME_UNIT_YEAR = "Y";

    public static String GOAL_KIND_REGULAR = "regular";
    public static String GOAL_KIND_DEADLINE = "deadline";

    // 검색
    public static String SEARCH_RANGE_CORRECT = "C"; // 정방향
    public static String SEARCH_RANGE_REVERSE = "R"; // 역방향
    public static String SEARCH_RANGE_EXIST = "E"; // 단 하나의 원소(일자)라도 존재하(겹치)는 경우

    // 유효 sns 서비스 모음.
    public static String[] supportSNSarr = new String[]{"google"};

    // 유효 sns 서비스와 서비스 코드 매핑.
    public static Map<String, String> snsNameToTypeMap = new HashMap<>() {{
        put("google","G");
        put("naver","N");
        put("kakao","K");
    }};

    // 유효 file part name 모음.
    public static String[] supportFilePartNameArr = new String[]{"profilePhoto","backgroundPhoto"};

    // 유효 file part name 와 file part 용 id 매핑.
    public static Map<String, String> supportFilePartNameToFilePartIdMap = new HashMap<>() {{
        put("profilePhoto","profilePhotoId");
        put("backgroundPhoto","backgroundPhotoId");
    }};

    // google 관련 정보.
    public static final String GOOGLE_TOKEN_BASE_URL ="https://oauth2.googleapis.com/token";

    // 성공.
    // 실패.
    public static String SUCCESS = "S";
    public static String FAIL = "F";

    public static int MEMBER_ID_MAX_LENGTH = 20;
    public static int MEMBER_ID_MIN_LENGTH = 4;

    public static int MEMBER_PASSWORD_MIN_LENGTH = 8;
    public static int MEMBER_PASSWORD_MAX_LENGTH = 20;

    public static final String getRandomHexColor() {
        Random random = new Random();
        float hue = random.nextFloat();
        // sat between 0.1 and 0.3
        float saturation = (random.nextInt(2000) + 1000) / 10000f;
        float luminance = 0.9f;
        Color color = Color.getHSBColor(hue, saturation, luminance);
        
        return '#' + Integer.toHexString(color.getRGB() & 0xffffff | 0x1000000).substring(1);
    }

}
