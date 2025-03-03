package com.example.logis_app.pojo.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddItemToCartQueryParam {
    private Integer itemId;
    private String itemName;
    private Integer sizeId;
    private Integer quantity;
    private Integer userId;
}
