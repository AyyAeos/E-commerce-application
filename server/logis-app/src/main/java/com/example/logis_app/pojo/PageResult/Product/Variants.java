package com.example.logis_app.pojo.PageResult.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Variants {

    private String size;
    private Integer stock;
    private BigDecimal price;
    private Integer sizeId;
    private Integer onSale = 0;

}
