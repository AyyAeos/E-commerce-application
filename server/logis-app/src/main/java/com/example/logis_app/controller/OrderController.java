package com.example.logis_app.controller;

import com.example.logis_app.pojo.vo.OrderVO.Order;
import com.example.logis_app.pojo.DTO.ProductDTO.ReviewDTO;
import com.example.logis_app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.logis_app.common.Result;

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

    @PostMapping
    public Result saveReview(@RequestBody ReviewDTO reviewDTO) {
        log.info("Write review : {} ", reviewDTO );
        orderService.saveReview(reviewDTO);
        return Result.success();
    }
}