package com.lds.trackdayb.exception;

public class CustomException extends RuntimeException{
    private String resultCode;
    private String message;

    public CustomException(String resultCode, String message){
        super(message);
        this.resultCode = resultCode;
    }

    public String getResultCode(){
        return resultCode;
    }
}
