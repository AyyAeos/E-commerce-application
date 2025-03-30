package com.example.logis_app.service;



import com.example.logis_app.pojo.vo.OrderVO.Order;
import com.example.logis_app.pojo.DTO.ProductDTO.ReviewDTO;

import java.util.List;

public interface OrderService {
    List<Order> getOrderList(Integer userId);

    void saveReview(ReviewDTO reviewDTO);
}
