package com.lds.trackdayb.maker;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
public class DropTableMaker {
    public static void main(String[] args) throws IOException {
        System.out.println("helloworld");
        BufferedReader reader = new BufferedReader(new FileReader("C:\\Github\\trackdayb\\sql\\dump-trackday-202107212126.sql"));
        String str;
        while ((str = reader.readLine()) != null) {
            if(str.contains("DROP TABLE IF EXISTS")){
                System.out.println(str);
            }

        }
        reader.close();

// 출처: https://hianna.tistory.com/587 [어제 오늘 내일]
    }
}