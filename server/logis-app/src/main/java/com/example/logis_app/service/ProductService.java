package com.example.logis_app.service;

import com.example.logis_app.pojo.PageResult.Product.ProductPage;

import java.util.List;

public interface ProductService {
    List<ProductPage> getProductList();
}
