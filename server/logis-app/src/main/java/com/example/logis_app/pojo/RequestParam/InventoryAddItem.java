package com.example.logis_app.pojo.RequestParam;

import com.example.logis_app.pojo.PageResult.Product.Variants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class InventoryAddItem {
    private Integer itemId;
    private String itemName;
    private BigDecimal price;
    private String description;
    private List<InventoryVariants> variants;
}
