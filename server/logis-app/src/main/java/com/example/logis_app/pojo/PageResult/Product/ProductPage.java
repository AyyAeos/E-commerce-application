package com.example.logis_app.pojo.PageResult.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductPage {
    private Long itemId;
    private String itemName;
    private String description;

    private List<Variants> variants;
}
