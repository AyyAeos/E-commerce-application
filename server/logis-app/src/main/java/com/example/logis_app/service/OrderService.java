package com.example.logis_app.service;



import com.example.logis_app.pojo.PageResult.Order.Order;

import java.util.List;

public interface OrderService {
    List<Order> getOrderList(Integer userId);
}
