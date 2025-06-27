package com.example.logis_app.Mapper;

import com.example.logis_app.model.DTO.CartDTO.PlaceOrderDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CheckOutMapper {

    void placeOrder(PlaceOrderDTO selectedItems);

    void updateOrderStatus(Integer cartId);
}
