package com.example.logis_app.service;

import com.example.logis_app.pojo.DTO.CartDTO.PlaceOrderDTO;

import java.util.List;

public interface CheckOutService {
    void placeOrder(List<PlaceOrderDTO> placeOrderDTOS, Integer userId);
}
