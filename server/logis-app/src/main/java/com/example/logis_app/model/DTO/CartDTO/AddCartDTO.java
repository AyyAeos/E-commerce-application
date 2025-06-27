package com.example.logis_app.model.DTO.CartDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddCartDTO {
    private Integer itemId;
    private String itemName;
    private Integer sizeId;
    private Integer quantity;
    private Integer userId;
}
