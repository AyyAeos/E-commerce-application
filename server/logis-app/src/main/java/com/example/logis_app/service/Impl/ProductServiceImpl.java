package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.ProductMapper;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import com.example.logis_app.pojo.RequestParam.AddItemToCartQueryParam;
import com.example.logis_app.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Slf4j
@Service
@Transactional
public class ProductServiceImpl  implements ProductService {
    @Autowired
    private ProductMapper productMapper;
    @Override
    public List<ProductPage> getProductList() {

        List<Map<String, Object>> productList = productMapper.getProductList();
        
        // Store Product
        Map<Long, ProductPage> productMap = new HashMap<>();

        productList.forEach(data -> {

//            Object itemIdObject = data.get("item_id");
//            log.info("item_id type: " + itemIdObject.getClass().getName());
            // unsigned exist range to mybatis return long

            Long itemId = (Long) data.get("item_id");
            String itemName = (String) data.get("item_name");
            String description = (String) data.get("description");
            String size = (String) data.get("size");
            Integer stock = (Integer) data.get("stock");
            BigDecimal price = (BigDecimal) data.get("price");

            // Create the variant object of size stock and price
            Variants variant = new Variants(size, stock, price);

            // Check if the product already exists in the map
            if (productMap.containsKey(itemId)) {
                // If the product already exists, add the variant to the existing product page
                ProductPage existingProductPage = productMap.get(itemId);
                existingProductPage.getVariants().add(variant); // Add variant to the existing list
            } else {
                // If the product doesn't exist, create a new product page and add the variant
                List<Variants> variantsList = new ArrayList<>();
                variantsList.add(variant);
                ProductPage productPage = new ProductPage(itemId, itemName, description, variantsList);
                productMap.put(itemId, productPage); // Add new product to the map
            }
        });
        Collection<ProductPage> productPages = productMap.values();
        List<ProductPage> productPageList = new ArrayList<>(productPages);
        return productPageList;
    }

    @Override
    public ProductPage getSpecificProduct(Integer id) {
        List<Map<String, Object>> productList = productMapper.getSpecificProduct(id);

        Map<Long, ProductPage> productMap = new HashMap<>();

        productList.forEach(data -> {
            Long itemId = (Long) data.get("item_id");
            String itemName = (String) data.get("item_name");
            String description = (String) data.get("description");
            String size = (String) data.get("size");
            Integer stock = (Integer) data.get("stock");
            BigDecimal price = (BigDecimal) data.get("price");
            Variants variant = new Variants(size, stock, price);

            if (productMap.containsKey(itemId)) {
           
                ProductPage existingProductPage = productMap.get(itemId);
                existingProductPage.getVariants().add(variant); 
            } else {
            
                List<Variants> variantsList = new ArrayList<>();
                variantsList.add(variant);
                ProductPage productPage = new ProductPage(itemId, itemName, description, variantsList);
                productMap.put(itemId, productPage); 
            }
        });

        return productMap.values().iterator().next();
    }

    @Override
    public void addToCard(AddItemToCartQueryParam addItemToCartQueryParam) {
         productMapper.addToCard(addItemToCartQueryParam);
        
    }

    
}
