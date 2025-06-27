package com.example.logis_app.controller;
import com.example.logis_app.model.DTO.CartDTO.PlaceOrderDTO;
import com.example.logis_app.common.Result;
import com.example.logis_app.service.CheckOutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/checkouts/{userId}")
public class CheckOutController {

    @Autowired
    private CheckOutService checkOutService;

    @PostMapping
    public Result placeOrder(@PathVariable Integer userId,
                             @RequestBody List<PlaceOrderDTO> placeOrderDTOS) {
        log.info("Placing Order");
        checkOutService.placeOrder(placeOrderDTOS, userId);
        return Result.success();

    }
}
