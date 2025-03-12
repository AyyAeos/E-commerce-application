package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.ProductMapper;
import com.example.logis_app.pojo.PageResult.Product.CartPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import com.example.logis_app.pojo.RequestParam.AddItemToCartQueryParam;
import com.example.logis_app.service.ProductService;
import com.example.logis_app.util.ProductPageUtil;

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
        return ProductPageUtil.transformToProductPage(productList);
    }

    @Override
    public ProductPage getSpecificProduct(Integer id) {
        List<Map<String, Object>> productList = productMapper.getSpecificProduct(id);
        List<ProductPage> products = ProductPageUtil.transformToProductPage(productList);
        return products.isEmpty() ? null : products.get(0);
    }

    @Override
    public void addToCard(AddItemToCartQueryParam addItemToCartQueryParam) {
         //check product exist
        if(productMapper.checkProductExist(addItemToCartQueryParam)) {
            log.info("Product exist");
            productMapper.updateQuantity(addItemToCartQueryParam);
        } else {
            log.info("Product not exist. Creating new product . . .");
            productMapper.addToCard(addItemToCartQueryParam);
        }
    }

    @Override
    public BigDecimal checkPrice(Integer sizeId) {
        return productMapper.checkPrice(sizeId);
    }
}
