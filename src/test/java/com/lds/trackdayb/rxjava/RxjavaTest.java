package com.lds.trackdayb.rxjava;

import io.reactivex.Flowable;
import io.reactivex.Observable;
import io.reactivex.subscribers.DisposableSubscriber;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class RxjavaTest {

    @Test
    public void testX_X(){
        System.out.println("helloworld");
    }

    @Test
    public void test0_X(){
        // 0 블로그 예시 테스트.
        Observable<String> source = Observable.create(emitter -> {
            emitter.onNext("Hello");
            emitter.onNext("ryalya");
            emitter.onComplete();
        });
        source.subscribe(System.out::println);
    }

    @Test
    public void test2_1(){
        // 2-1
        Observable.just(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
// 짝수에 해당하는 데이터만 통지한다
                .filter(f -> f % 2 == 0)
// 데이터를 100배로 변환한다
                .map(f -> f * 100)
                .subscribe(f -> System.out.println("data=" + f));
    }

    @Test
    public void test2_2(){
        // 2-2
        Flowable<Integer> flowable =
// 인자의 데이터를 순서대로 통지하는 Flowable을 생성한다
                Flowable.just(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
// 짝수에 해당하는 데이터만 통지한다
                        .filter(f -> f % 2 == 0)
// 데이터를 100배로 변환한다
                        .map(f -> f * 100);
// 구독하고 받은 데이터를 출력한다
        flowable.subscribe(f -> System.out.println("data=" + f));
    }
    @Test
    public void test2_3(){
        // 2-3
// 인자의 데이터를 순서대로 통지하는 Flowable을 생성한다
        Flowable.just(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
// 짝수에 해당하는 데이터만 통지한다
                .filter(f -> f % 2 == 0)
// 데이터를 100배로 변환한다
                .map(f -> f * 100)
                .subscribe(System.out::println);
    }

    @Test
    public void test3_1(){
        // 3-1. 일반적인 방법
// 리스트에서 Iterator를 얻는다
        List<String> listArr = Arrays.asList("a", "b", "c");
        Iterator<String> iterator = listArr.iterator();

// 받을 데이터가 남아있는지 확인한다
        while (iterator.hasNext()) {
// 데이터를 얻는다
            String value = iterator.next();
// 얻은 데이터를 출력한다
            System.out.println(value);
        }
    }

    @Test
    public void test3_2(){
// 3-2. RxJava
// 리스트로 Flowable을 생성한다
        List<String> listFlow = Arrays.asList("a", "b", "c");
        Flowable<String> flowableList = Flowable.fromIterable(listFlow);

// 처리를 시작한다
        flowableList.subscribe(System.out::println);
    }


    public static void test4_X(){
// 4. Sleep
        Flowable.just("a!!!!", "b!!!!", "c!!!!")
                .flatMap( f -> {
// 1000밀리초 늦게 데이터를 통지하는 Flowable을 생성한다
                    return Flowable.just(f).delay(3000L, TimeUnit.MILLISECONDS);
                })
                .subscribe(System.out::println);

// Thread.sleep(5000L);
    }

    @Test
    public void test5_1(){
// 5-1. Error Handling
        Flowable.just(1, 3, 5, 0, 2, 4)
// 받은 데이터로 100을 나눈다
                .map(f -> 100 / f)
// 에러가 발생하면 0을 통지한다
// .onErrorReturnItem(0)
// 구독한다
                .subscribe(new DisposableSubscriber<Integer>() {
                    @Override
                    public void onNext(Integer data) {
                        System.out.println("data=" + data);
                    }
                    @Override
                    public void onError(Throwable error) {
                        System.out.println("error1=" + error);
                    }
                    @Override
                    public void onComplete() {
                        System.out.println("완료");
                    }
                });
    }

    @Test
    public void test5_2(){
// 5-2
        Flowable.just(1, 3, 5, 0, 2, 4)
// 받은 데이터로 100을 나눈다
                .map(f -> 100 / f)
// 에러가 발생하면 0을 통지한다
                .onErrorReturnItem(9999)
// 구독한다
                .subscribe( f -> {
                            System.out.println("data=" + f);
                        },
                        err -> System.out.println("error2=" + err),
// 세 번째 인자: 완료 통지 시
                        () -> System.out.println("완료")
                );
    }

    @Test
    public void test6_X(){
        // 6. FlatMap
// 인자의 데이터를 통지하는 Flowable을 생성한다
        Flowable.just("A", "", "B", "", "C")
// flatMap 메서드로 빈 문자를 제거하거나 소문자로 변환한다
                .flatMap(f -> {
                    if ("".equals(f)) {
// 빈 문자라면 빈 Flowable을 반환한다
                        return Flowable.empty();
                    } else {
// 소문자로 변환한 데이터가 담긴 Flowable을 반환한다
                        return Flowable.just(f.toLowerCase());
                    }
                })
                .subscribe(System.out::println);
    }

    @Test
    public void test7_X(){
        // 7. OnNext
// Flowable을 생성한다
        Flowable.range(1, 5)
// 데이터 통지 시 로그를 출력한다
                .doOnNext(data -> System.out.println("--- 기존 데이터: " + data))
// 짝수만 통지한다
                .filter(data -> data % 2 == 0)
// 데이터 통지 시 로그를 출력한다
                .doOnNext(data -> System.out.println("------ filter 적용 후 데이터: " + data))
// 구독한다
                .subscribe(System.out::println);
    }

    @Test
    public void test8_X(){
//        8. OnError
// Flowable을 생성한다
        Flowable.range(1, 5)
// 에러 통지 시 로그를 출력한다
                .doOnError(error -> System.out.println("기존 데이터: " + error.getMessage()))
// 데이터가 '3'일 때 에러가 발생한다
                .map(data -> {
                    if (data == 3) {
                        throw new Exception("예외 발생");
                    }
                    return data;
                })
// 에러 통지 시 로그를 출력한다
                .doOnError(error -> System.out.println("--- map 적용 후: " + error.getMessage()))
                .onErrorReturn(e -> {
                    if(e instanceof NumberFormatException) {
                        e.printStackTrace();
                    }
                    else
                        e.getMessage();
                    return -1;
                })
// 구독한다
                .subscribe(System.out::println);
    }

    @Test
    public void test9_X(){
// 9. OnComplete
        Flowable.range(1, 5)
// 완료 통지 시 로그를 출력한다
                .doOnComplete(() -> System.out.println("doOnComplete"))
// 구독한다
                .subscribe(System.out::println
                        ,
                        err -> System.out.println("error3=" + err),
// 세 번째 인자: 완료 통지 시
                        () -> System.out.println("완료")
                );
    }

}
