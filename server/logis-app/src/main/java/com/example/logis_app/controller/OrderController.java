package com.example.logis_app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.logis_app.pojo.Result;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/orders/{userId}")
public class OrderController {
   
    @GetMapping
    public Result getOrderList(@PathVariable Integer userId) {
        log.info("Get order list of user id {} . . .", userId);
        return null;
    }
}