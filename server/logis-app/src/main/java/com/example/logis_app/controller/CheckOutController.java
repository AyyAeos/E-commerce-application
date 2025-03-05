package com.example.logis_app.controller;
import com.example.logis_app.pojo.RequestParam.SelectedItem;
import com.example.logis_app.pojo.Result;
import com.example.logis_app.service.CheckOutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/checkouts/{userId}")
public class CheckOutController {

    @Autowired
    private CheckOutService checkOutService;

    @PostMapping
    public Result placeOrder(@PathVariable Integer userId,
                             @RequestBody List<SelectedItem> selectedItems ) {
        for(SelectedItem selectedItem : selectedItems) {
            selectedItem.setUserId(userId);
        }
        log.info(" total price = {}", selectedItems);
        checkOutService.placeOrder(selectedItems);
        return Result.success();

    }
}
