package com.example.logis_app.model.DTO.InventoryDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AddItemDTO {
    private Integer itemId;
    private String itemName;
    private BigDecimal price;
    private String description;
    private List<InventoryVariantsDTO> variants;
}
