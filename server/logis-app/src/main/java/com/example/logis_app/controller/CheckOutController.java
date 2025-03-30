package com.example.logis_app.controller;
import com.example.logis_app.pojo.DTO.CartDTO.PlaceOrderDTO;
import com.example.logis_app.common.Result;
import com.example.logis_app.service.CheckOutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/checkouts/{userId}")
public class CheckOutController {

    @Autowired
    private CheckOutService checkOutService;

    @PostMapping
    public Result placeOrder(@PathVariable Integer userId,
                             @RequestBody List<PlaceOrderDTO> placeOrderDTOS) {
        String orderId = new String(UUID.randomUUID().toString());
        for(PlaceOrderDTO placeOrderDTO : placeOrderDTOS) {
            placeOrderDTO.setOrderId(orderId);
            placeOrderDTO.setUserId(userId);
        }
        log.info(" Selected item  = {}", placeOrderDTOS);
        checkOutService.placeOrder(placeOrderDTOS);
        return Result.success();

    }
}
