package com.example.logis_app.pojo.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryQueryParam {
    private Integer itemId;
    private String itemName;
    private Boolean onSale;
    private String size;
    private Integer stockQuantity;

    private BigDecimal price;

    //for min price and max price
    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    private String description;



}
