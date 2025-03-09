package com.example.logis_app.controller;
import com.example.logis_app.pojo.RequestParam.SelectedItem;
import com.example.logis_app.pojo.Result;
import com.example.logis_app.service.CheckOutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
                             @RequestBody List<SelectedItem> selectedItems ) {
        String orderId = new String(UUID.randomUUID().toString());
        log.info("1");
        for(SelectedItem selectedItem : selectedItems) {
            selectedItem.setOrderId(orderId);
            selectedItem.setUserId(userId);
        }
        log.info(" Selected item  = {}", selectedItems);
        checkOutService.placeOrder(selectedItems);
        return Result.success();

    }
}
