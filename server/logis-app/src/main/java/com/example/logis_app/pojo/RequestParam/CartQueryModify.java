package com.example.logis_app.pojo.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartQueryModify {
    private Integer cartId;
    private Integer quantity;
    private Integer sizeId;
    private Integer userId;
}
