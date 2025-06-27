package com.example.logis_app.controller;

import java.util.List;

import com.example.logis_app.model.DTO.CartDTO.ModifyCartDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.logis_app.common.Result;
import com.example.logis_app.model.vo.ProductVO.CartPage;
import com.example.logis_app.service.CartService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{id}")
    public Result checkCart(@PathVariable Integer id) {
        log.info("Querying user cart. ");
        List<CartPage> list = cartService.checkCart(id);
        return Result.success(list);
    }

    @PutMapping("/{userId}")
    public Result modifyQuantity(@PathVariable Integer userId,
                                 @RequestBody ModifyCartDTO modifyCartDTO) {
        modifyCartDTO.setUserId(userId);
        log.info("Modifying cart item quantity. ");
        cartService.modifyQuantity(modifyCartDTO);
        return Result.success();
    }
}
