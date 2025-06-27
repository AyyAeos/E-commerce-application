package com.example.logis_app.model.vo;

import com.example.logis_app.model.vo.ProductVO.ProductPage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
