package com.example.logis_app.service;



import com.example.logis_app.pojo.PageResult.Order.Order;
import com.example.logis_app.pojo.RequestParam.ReviewDTO;

import java.util.List;

public interface OrderService {
    List<Order> getOrderList(Integer userId);

    void saveReview(ReviewDTO reviewDTO);
}
