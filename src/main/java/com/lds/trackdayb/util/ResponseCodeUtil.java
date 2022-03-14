package com.lds.trackdayb.util;

public final class ResponseCodeUtil {
    public final static String RESULT_CODE_SUCESS = "0000";					// 성공
    public static final String RESULT_CODE_UNOWNEED_RESOURCES_ACCESS = "9987";
    public static final String RESULT_CODE_NO_LINKED_MEMBER = "9989";
    public static final String RESULT_CODE_DELETED_USER = "9990";
    public final static String RESULT_CODE_UNSUPPORT_SNS = "9991";       // 지원하지않는 SNS.
    public final static String RESULT_CODE_DUPLICATE_SNS_EMAIL = "9992";       // 중복 SNS 이메일.
    public final static String RESULT_CODE_ACCESS_AUTH_FAIL = "9993";        // 접근 권한 실패.
    public final static String RESULT_CODE_SNS_AUTH_SERVER_FAIL = "9994";       // SNS 인증 서버 인증 실패.
    public final static String RESULT_CODE_INVALID_REFRESH_TOKEN = "9995";					// 유효하지 않은 리프래시 토큰.    
    public final static String RESULT_CODE_ID_PASSWORD_VALID_FAIL = "9996";					// 아이디 유효성 실패.
    public final static String RESULT_CODE_DUPLICATE_MEMBER = "9997";           // 이미 존재하는 회원입니다.
    public final static String RESULT_CODE_LOGIN_FAIL = "9998";					// 로그인 실패 - 아이디, 비밀번호 확인 필요.
    public final static String RESULT_CODE_FAIL = "9999";					// 실패


}
