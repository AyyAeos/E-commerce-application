package com.example.logis_app.exception;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import com.example.logis_app.pojo.Result;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public Result handleException (Exception e) {
        log.error("System error", e);
        return Result.error("System error, Please contact developer");
    }

    public Result handleDuplicateKeyException (DuplicateKeyException e) {
        log.error("System error", e);
        String message = e.getMessage();
        int i = message.indexOf("Duplicate entry");
        String errMsg = message.substring(i);
        String [] arr = errMsg.split(" ");

        return Result.error(arr[2] + " is exist");
    }
}