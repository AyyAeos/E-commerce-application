package com.example.logis_app.common.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.logis_app.model.vo.ProductVO.ProductPage;
import com.example.logis_app.model.vo.ProductVO.Variants;

public class ProductPageUtil {

    private ProductPageUtil productPageUtil;


    public static List<ProductPage> transformToProductPage(List<Map<String, Object>> productList) {

        Integer itemCount = 0;
        Map<Long, ProductPage> productMap = new HashMap<>();

        productList.forEach(data -> {
            Long itemId = (Long) data.get("item_id");
            String itemName = (String) data.get("item_name");
            Integer onSaleInt = (Integer) data.get("on_sale");
            Integer onSale = (onSaleInt != null && onSaleInt == 1) ? 1 : 0;
            String description = (String) data.get("description");
            String size = (String) data.get("size");
            Integer stock = (Integer) data.get("stock");
            BigDecimal price = (BigDecimal) data.get("price");
            Integer sizeId = (Integer) data.get("size_id");
            Variants variant = new Variants(size, stock, price, sizeId, onSale);

            //if key exist add the exisiting list
            //if no new a productpage
            productMap.computeIfAbsent(itemId, id -> new ProductPage(id, itemName, description, new ArrayList<>()))
                      .getVariants()
                      .add(variant);
        });

        return new ArrayList<>(productMap.values());
    }
}
