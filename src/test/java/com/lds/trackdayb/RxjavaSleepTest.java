package com.lds.trackdayb;

import io.reactivex.Flowable;

import java.util.concurrent.TimeUnit;

public class RxjavaSleepTest {
    public static void main(String[] args) throws InterruptedException {
    // 4. Sleep
                Flowable.just("a!!!!", "b!!!!", "c!!!!")
                        .flatMap( f -> {
    // 1000밀리초 늦게 데이터를 통지하는 Flowable을 생성한다
                            return Flowable.just(f).delay(1000L, TimeUnit.MILLISECONDS);
                        })
                        .subscribe(System.out::println);

     Thread.sleep(5000L);
    }
}
