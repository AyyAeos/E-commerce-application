package com.example.logis_app.service.Impl;

import java.math.BigDecimal;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.logis_app.Mapper.CartMapper;
import com.example.logis_app.pojo.PageResult.Product.CartPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.PageResult.Product.Variants;
import com.example.logis_app.service.CartService;
import com.example.logis_app.util.ProductPageUtil;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;

    @Override
    public List<CartPage> checkCart(Integer id) {

        List<CartPage> list =  cartMapper.checkCart(id);

         for(CartPage cartPage: list) {
             cartPage.setPrice(cartPage
                     .getPrice()
                     .multiply(BigDecimal.valueOf(cartPage.getQuantity())));
         }

         return list;


    }


    
}
