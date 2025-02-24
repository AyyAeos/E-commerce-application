package com.example.logis_app.service;

import com.example.logis_app.pojo.PageResult.InventoryPage;
import com.example.logis_app.pojo.RequestParam.InventoryQueryParam;

import java.util.List;

public interface InventoryService {
    List<InventoryPage> getAllItems();

    List<InventoryPage>  getItemBySelected(InventoryQueryParam inventoryQueryParam);

    void insertNewItem(InventoryQueryParam inventoryQueryParam);

    void updateItem(InventoryQueryParam item);

    void deleteItem(Integer id);
}
