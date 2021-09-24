package com.lds.trackdayb;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
public class StringPaserTest {
    public static void main(String[] args) throws IOException {
        System.out.println("helloworld");
        BufferedReader reader = new BufferedReader(new FileReader("C:\\Github\\vscode_projects\\trackdayb\\src\\main\\java\\com\\lds\\trackdayb\\dto\\PeriodicityInfoDTO.java"));
        String str;
        while ((str = reader.readLine()) != null) {
            if(str.contains("private String")){
                String[] test = str.split(" ");
                try {
                    System.out.println("\"" +test[6] + "\" : \"\",");
                } catch (Exception e) {
                    //TODO: handle exception
                }

            }

        }
        reader.close();

// 출처: https://hianna.tistory.com/587 [어제 오늘 내일]
    }
}