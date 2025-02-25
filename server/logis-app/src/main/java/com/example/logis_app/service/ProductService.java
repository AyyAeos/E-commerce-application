package com.example.logis_app.service;

import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.RequestParam.AddItemToCartQueryParam;

import java.util.List;

public interface ProductService {
    List<ProductPage> getProductList();

    ProductPage getSpecificProduct(Integer id);

    void addToCard(AddItemToCartQueryParam addItemToCartQueryParam);

    
}
