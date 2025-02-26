package com.example.logis_app.Mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper

public interface CartMapper {

    List<Map<String, Object>> checkCart(Integer id);

}
