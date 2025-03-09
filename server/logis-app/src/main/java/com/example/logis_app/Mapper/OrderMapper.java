package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.RequestParam.SelectedItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderMapper {
    List<Map<String, Object>> getOrderList(Integer userId);
}
