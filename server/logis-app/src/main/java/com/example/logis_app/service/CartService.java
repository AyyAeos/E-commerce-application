package com.example.logis_app.service;

import java.util.List;

import com.example.logis_app.model.vo.ProductVO.CartPage;
import com.example.logis_app.model.DTO.CartDTO.ModifyCartDTO;

public interface CartService {

    List<CartPage> checkCart(Integer id);

    void modifyQuantity(ModifyCartDTO modifyCartDTO);
}
