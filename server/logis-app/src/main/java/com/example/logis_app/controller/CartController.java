package com.example.logis_app.controller;

import java.util.List;

import com.example.logis_app.pojo.RequestParam.CartQueryModify;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.logis_app.pojo.Result;
import com.example.logis_app.pojo.PageResult.Product.CartPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
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
        log.info("Querying user cart");
        List<CartPage> list = cartService.checkCart(id);
        return Result.success(list);
    }

    @PutMapping("/{userId}")
    public Result modifyQuantity(@PathVariable Integer userId,
                                 @RequestBody CartQueryModify cartQueryModify) {
        cartQueryModify.setUserId(userId);
        log.info("Card id : {} , new Quantity : {} ", cartQueryModify.getCartId(), cartQueryModify.getQuantity());
        cartService.modifyQuantity(cartQueryModify);
        return Result.success();
    }
}
