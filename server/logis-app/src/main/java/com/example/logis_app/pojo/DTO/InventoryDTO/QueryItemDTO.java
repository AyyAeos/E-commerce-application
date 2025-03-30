package com.example.logis_app.pojo.DTO.InventoryDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryItemDTO {
    private Integer itemId;
    private String itemName;
    private Integer onSale;
    private String size;
    private Integer stockQuantity;

    private Integer sizeId;

    private BigDecimal price;

    //for min price and max price
    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    private Integer begin;

    private String description;

    private Integer totalCounts;
    private Integer page = 1;
    private Integer pageLimits = 10;



}
