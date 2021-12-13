package com.lds.trackdayb;

import java.awt.Color;
import java.util.Random;

public class randomColorTest {
    public static void main(String[] args) {
        mytest();
        System.out.println("helloworld");
        Object Syso = new Object();
        String s = Syso.toString();
        System.out.println();
        for (int i = 0; i < 5; i++) {
            System.out.println("test");
        }

    }

    private static void mytest() {
        for (int i = 0; i < 50; i++) {
            System.out.println(getRandomHexColor());
        }
    }

    public static String getRandomHexColor() {
        Random random = new Random();
        float hue = random.nextFloat();
        // sat between 0.1 and 0.3
        float saturation = (random.nextInt(2000) + 1000) / 10000f;
        float luminance = 0.9f;
        Color color = Color.getHSBColor(hue, saturation, luminance);

        return '#' + Integer.toHexString(color.getRGB() & 0xffffff | 0x1000000).substring(1);
    }

}
