package com.example.logis_app.pojo.PageResult;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryPage {
    private Integer itemId;
    private String itemName;
    private Boolean onSale = false;
    private String description;
    private String size;
    private BigDecimal price;
    private String stock;
}
