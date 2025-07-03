package com.example.logis_app.common.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.logis_app.common.Result;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public Result handleException(Exception e) {
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

    @ExceptionHandler(ItemAlreadyExistsException.class)
    public ResponseEntity<String> handleItemAlreadyExistsException(ItemAlreadyExistsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, Object> handleUnauthorized(UnauthorizedException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("code", 401);
        errorResponse.put("msg", "unauthorized");
        errorResponse.put("detail", ex.getMessage());
        return errorResponse;
    }
}
