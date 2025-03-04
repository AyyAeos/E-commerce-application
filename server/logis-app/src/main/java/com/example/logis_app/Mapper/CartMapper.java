package com.example.logis_app.Mapper;

import java.util.List;
import java.util.Map;

import com.example.logis_app.pojo.PageResult.Product.CartPage;
import com.example.logis_app.pojo.RequestParam.CartQueryModify;
import org.apache.ibatis.annotations.Mapper;

@Mapper

public interface CartMapper {

    List<CartPage> checkCart(Integer id);

    void modifyQuantity(CartQueryModify cartQueryModify);
}
