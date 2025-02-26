package com.example.logis_app.service.Impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.logis_app.Mapper.CartMapper;
import com.example.logis_app.pojo.PageResult.Product.CartPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import com.example.logis_app.service.CartService;
import com.example.logis_app.util.ProductPageUtil;
@Service

public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;

    @Override
    public List<ProductPage> checkCart(Integer id) {
        List<Map<String, Object>> productList = cartMapper.checkCart(id);
        return ProductPageUtil.transformToProductPage(productList);
    }


    
}
