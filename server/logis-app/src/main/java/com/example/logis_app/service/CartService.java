package com.example.logis_app.service;

import java.util.List;

import com.example.logis_app.pojo.PageResult.Product.CartPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.RequestParam.CartQueryModify;

public interface CartService {

    List<CartPage> checkCart(Integer id);

    void modifyQuantity(CartQueryModify cartQueryModify);
}
