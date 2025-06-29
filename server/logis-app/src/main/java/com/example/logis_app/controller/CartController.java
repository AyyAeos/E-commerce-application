package com.example.logis_app.controller;

import java.util.List;

import com.example.logis_app.model.DTO.CartDTO.ModifyCartDTO;
import com.example.logis_app.common.Result;
import com.example.logis_app.model.vo.ProductVO.CartPage;
import com.example.logis_app.model.vo.LoginVO.LoginUser;
import com.example.logis_app.service.CartService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    // ✅ Securely fetch cart by user ID from JWT
    @GetMapping
    public Result checkCart() {
        log.info("Querying user cart.");

        LoginUser loginUser = (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<CartPage> list = cartService.checkCart(loginUser.getUser().getUserId());
        return Result.success(list);
    }

    // ✅ Securely modify cart using authenticated user
    @PutMapping
    public Result modifyQuantity(@RequestBody ModifyCartDTO modifyCartDTO) {
        log.info("Modifying cart item quantity.");

        LoginUser loginUser = (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Integer userId = loginUser.getUser().getUserId();
        modifyCartDTO.setUserId(userId);

        cartService.modifyQuantity(modifyCartDTO);

        return Result.success();
    }
}