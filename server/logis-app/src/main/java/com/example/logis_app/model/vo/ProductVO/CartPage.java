package com.example.logis_app.model.vo.ProductVO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartPage {
    private Integer cartId;
    private String itemId;
    private Integer quantity;
    private Integer sizeId;
    private LocalDateTime updatedAt;
    private String size;
    private String itemName;
    private BigDecimal price;
}
