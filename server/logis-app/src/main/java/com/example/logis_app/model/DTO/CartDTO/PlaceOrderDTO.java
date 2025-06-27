package com.example.logis_app.model.DTO.CartDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderDTO {
    private Integer cartId;
    private Integer itemId;
    private Integer quantity;
    private Integer sizeId;
    private Integer userId;
    private String orderId;
}
