package com.example.logis_app.controller;

import com.example.logis_app.pojo.PageResult.Order.Order;
import com.example.logis_app.pojo.RequestParam.SelectedItem;
import com.example.logis_app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.logis_app.pojo.Result;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/orders/{userId}")
public class OrderController {

    @Autowired
    private OrderService orderService;
   
    @GetMapping
    public Result getOrderList(@PathVariable Integer userId) {
        log.info("Get order list of user id {} . . .", userId);
        List<Order> list = orderService.getOrderList(userId);
        return Result.success(list);
    }
}