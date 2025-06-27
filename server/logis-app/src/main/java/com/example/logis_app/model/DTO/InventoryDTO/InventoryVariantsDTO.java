package com.example.logis_app.model.DTO.InventoryDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryVariantsDTO {
    private Integer itemId;
    private String size;
    private BigDecimal price;
    private Integer stock;
    private Integer onSale;
}
