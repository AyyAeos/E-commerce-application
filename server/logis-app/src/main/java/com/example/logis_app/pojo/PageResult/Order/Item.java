package com.example.logis_app.pojo.PageResult.Order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    private Integer cartId;
    private Integer itemId;
    private Integer quantity;
    private Integer sizeId;
    private String itemName;
    private String sizeName;
}
