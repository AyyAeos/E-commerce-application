package com.example.logis_app.pojo.DTO.CartDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModifyCartDTO {
    private Integer cartId;
    private Integer quantity;
    private Integer sizeId;
    private Integer userId;
}
