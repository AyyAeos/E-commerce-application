package com.example.logis_app.pojo.PageResult.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartPage {
    private Integer itemId;
    private String itemName;
    private String size;
    private Integer quantity;
    private Integer userId;
    private Integer username;
}
