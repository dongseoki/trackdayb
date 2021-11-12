import com.lds.trackdayb.util.SecurityUtil;

public class validationTest {
    public static void main(String[] args) {
        String[] testSet = {
            "votmdnj&em123"
            , "kjs@aldkjfklj43"
            , "QBWfklj4543"
            , "abct438983"
            , "acdf@sabcer9182"
            , "alfl234kdd"
            , "asd@fasdf987"
            // Blank 테스트 문자열
            , "xp@tmxm85 84"
            // 공백 테스트 문자열
            , ""
            // 문자 길이 테스트 문자열
            , "OJHDSJK@HFzDLKDJLJoiejwf42^%wij"
            , "xyz47@"
            , "1lkjvneim@"
            // ASCII Overflow 테스트 문자열
            , "/01alkjdffn"
            , "9:;aslkdjfkja2"
            , "?@alakjlkiie3"
            , "Z[\\ekjmvkfd4"
            , "@abieofinv2"
            , "89:8973589723dfasb"
            , "YZ[qoeirnvk235"
            , "111111111111111111"
            , "aaaaaaaaaaaaaaaaaa"
        };
    
        for (String s : testSet) {
          System.out.println("Password: \"" + s + "\"");
          System.out.println(SecurityUtil.isValidPassword(s));
          System.out.println("--------------------------------");
        }

        
    }
}