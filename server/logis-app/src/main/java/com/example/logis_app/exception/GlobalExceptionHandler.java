package com.example.logis_app.exception;

import org.springframework.dao.DataIntegrityViolationException;
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

    @ExceptionHandler(DataIntegrityViolationException.class)
    public Result handleDuplicateKeyException(DataIntegrityViolationException ex) {
        String message = "A database error occurred.";

        if (ex.getCause() instanceof java.sql.SQLIntegrityConstraintViolationException) {
            String errorMessage = ex.getCause().getMessage();

            if (errorMessage.contains("username_UNIQUE")) {
                message = "Username already exists. Please choose a different one.";
            } else if (errorMessage.contains("userPhone_UNIQUE")) {
                message = "Phone number is already registered. Use a different number.";
            } else if (errorMessage.contains("email_UNIQUE")) {
                message = "Email is already registered. Try logging in.";
            }
        }

        return Result.error(message);
    }
}