package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.PageResult.Product.Variants;
import com.example.logis_app.pojo.RequestParam.InventoryAddItem;
import com.example.logis_app.pojo.RequestParam.InventoryQueryParam;
import com.example.logis_app.pojo.RequestParam.InventoryVariants;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface InventoryMapper {
    List<Map<String, Object>> getAllItems();

    List<Map<String, Object>> getItemBySelected(InventoryQueryParam inventoryQueryParam);

    Integer insertItem(InventoryAddItem inventoryAddItem);

    void updateItem(InventoryQueryParam item);

    void deleteItem(Integer id, Integer sizeId);

    void insertItemSize(InventoryVariants inventoryVariants);

    void updateInventorySize(InventoryQueryParam item);

    Integer getSum(InventoryQueryParam inventoryQueryParam);

    Boolean checkItem(String itemName);
}
