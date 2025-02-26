package com.example.logis_app.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;

public class ProductPageUtil {

    private ProductPageUtil productPageUtil;

    public static List<ProductPage> transformToProductPage(List<Map<String, Object>> productList) {
        Map<Long, ProductPage> productMap = new HashMap<>();

        productList.forEach(data -> {
            Long itemId = (Long) data.get("item_id");
            String itemName = (String) data.get("item_name");
            String description = (String) data.get("description");
            String size = (String) data.get("size");
            Integer stock = (Integer) data.get("stock");
            BigDecimal price = (BigDecimal) data.get("price");
            Variants variant = new Variants(size, stock, price);

            //if key exist add the exisiting list
            //if no new a productpage
            productMap.computeIfAbsent(itemId, id -> new ProductPage(id, itemName, description, new ArrayList<>()))
                      .getVariants()
                      .add(variant);
        });

        return new ArrayList<>(productMap.values());
    }
}
