package com.example.logis_app.controller;

import com.example.logis_app.pojo.vo.InventoryPage;
import com.example.logis_app.pojo.DTO.InventoryDTO.AddItemDTO;
import com.example.logis_app.pojo.DTO.InventoryDTO.QueryItemDTO;
import com.example.logis_app.common.Result;
import com.example.logis_app.service.InventoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/admins/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/search")
    public Result getItemByParam(@ModelAttribute QueryItemDTO queryItemDTO) {

        log.info("Searched item : {} ", queryItemDTO);


        InventoryPage list = inventoryService.getItemBySelected(queryItemDTO);
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
    public Result addItem(@RequestBody AddItemDTO addItemDTO) {
        Boolean result = inventoryService.insertNewItem(addItemDTO);
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
    public Result updateItem(@PathVariable Integer id, @RequestBody QueryItemDTO item) {
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
