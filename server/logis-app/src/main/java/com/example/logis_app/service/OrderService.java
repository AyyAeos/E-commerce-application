package com.example.logis_app.service;



import com.example.logis_app.model.vo.OrderVO.Order;
import com.example.logis_app.model.DTO.ProductDTO.ReviewDTO;

import java.util.List;

public interface OrderService {
    List<Order> getOrderList(Integer userId);

    void saveReview(ReviewDTO reviewDTO);
}
