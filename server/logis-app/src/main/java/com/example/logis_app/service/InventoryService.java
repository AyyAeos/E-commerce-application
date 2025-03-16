package com.example.logis_app.service;

import com.example.logis_app.pojo.PageResult.InventoryPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.RequestParam.InventoryAddItem;
import com.example.logis_app.pojo.RequestParam.InventoryQueryParam;

import java.util.List;

public interface InventoryService {

    InventoryPage getItemBySelected(InventoryQueryParam inventoryQueryParam);

    Boolean insertNewItem( InventoryAddItem inventoryAddItem);

    void updateItem(InventoryQueryParam item);

    void deleteItem(Integer id, Integer sizeId);
}
