package com.example.logis_app.service;

import java.util.List;

import com.example.logis_app.pojo.vo.ProductVO.CartPage;
import com.example.logis_app.pojo.DTO.CartDTO.ModifyCartDTO;

public interface CartService {

    List<CartPage> checkCart(Integer id);

    void modifyQuantity(ModifyCartDTO modifyCartDTO);
}
