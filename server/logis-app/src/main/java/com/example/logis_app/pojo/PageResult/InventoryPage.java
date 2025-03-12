package com.example.logis_app.pojo.PageResult;

import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;



import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class InventoryPage {
    private List<ProductPage> list;

    private Integer itemCounts;
    private Integer page;
    private Integer pageLimits;
}
