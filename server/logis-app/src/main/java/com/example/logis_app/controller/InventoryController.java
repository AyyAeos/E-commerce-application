package com.example.logis_app.controller;

import com.example.logis_app.pojo.PageResult.InventoryPage;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.RequestParam.InventoryAddItem;
import com.example.logis_app.pojo.RequestParam.InventoryQueryParam;
import com.example.logis_app.pojo.Result;
import com.example.logis_app.service.InventoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/admins/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/search")
    public Result getItemByParam(@ModelAttribute InventoryQueryParam inventoryQueryParam) {

        log.info("Searched item : {} ", inventoryQueryParam);


        InventoryPage list = inventoryService.getItemBySelected(inventoryQueryParam);
       log.info("Selected list : {}", list);

         return Result.success(list);
    }

    /*
   { http://localhost:8080/admins/inventory/create
 "itemName": "Laptop",
 "size": "17-inch",
 "price": 1200.40,
 "stockQuantity": 20,
 "onSale": true
}
  */
    @PostMapping("/create")
    public Result addItem(@RequestBody InventoryAddItem inventoryAddItem) {
        Boolean result = inventoryService.insertNewItem(inventoryAddItem);
        return Result.success(result);
    }
    /*
    http://localhost:8080/admins/inventory/9
      {
    "itemName": "Lapto",
    "size": "17-inch",
    "price": 120.40,
    "stockQuantity": 2,
    "onSale": false

  }
     */
    @PutMapping("/{id}")
    public Result updateItem(@PathVariable Integer id, @RequestBody InventoryQueryParam item) {
        item.setItemId(id);
        inventoryService.updateItem(item);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result deleteItem(@PathVariable Integer id, @RequestParam Integer sizeId) {
        log.info("Item id to  be deleted : {}" , id );
        inventoryService.deleteItem(id, sizeId);
        return Result.success();
    }
}
