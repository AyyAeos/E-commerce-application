package com.example.logis_app.Mapper;

import java.util.List;
import java.util.Map;

import com.example.logis_app.pojo.PageResult.Product.CartPage;
import org.apache.ibatis.annotations.Mapper;

@Mapper

public interface CartMapper {

    List<CartPage> checkCart(Integer id);

}
