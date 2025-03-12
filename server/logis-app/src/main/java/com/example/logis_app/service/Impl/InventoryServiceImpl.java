package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.InventoryMapper;
import com.example.logis_app.pojo.PageResult.InventoryPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.RequestParam.InventoryQueryParam;
import com.example.logis_app.service.InventoryService;
import com.example.logis_app.util.ProductPageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
@Service
@Slf4j
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    private InventoryMapper inventoryMapper;

    @Override
    public InventoryPage getItemBySelected(InventoryQueryParam inventoryQueryParam) {
        inventoryQueryParam.setBegin((inventoryQueryParam.getPage() - 1) * inventoryQueryParam.getPageLimits());
        List<Map<String, Object>> productList =  inventoryMapper.getItemBySelected(inventoryQueryParam);
        Integer itemCounts = inventoryMapper.getSum(inventoryQueryParam);
        Integer page = inventoryQueryParam.getPage();
        Integer pageLimits = inventoryQueryParam.getPageLimits();

        List<ProductPage> list =  ProductPageUtil.transformToProductPage(productList);

        return new InventoryPage(list, itemCounts, page, pageLimits );


    }

    @Override
    public void insertNewItem(InventoryQueryParam inventoryQueryParam) {
        inventoryMapper.insertItem(inventoryQueryParam);
        inventoryMapper.insertItemSize(inventoryQueryParam);
    }

    @Override
    public void updateItem(InventoryQueryParam item) {

        inventoryMapper.updateItem(item);
        inventoryMapper.updateInventorySize(item);
    }

    @Override
    public void deleteItem(Integer id, Integer sizeId) {
        inventoryMapper.deleteItem(id, sizeId);
    }
}
