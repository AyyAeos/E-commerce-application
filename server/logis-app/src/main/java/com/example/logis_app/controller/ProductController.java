package com.example.logis_app.controller;

import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.Result;
import com.example.logis_app.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

   //http://localhost:8080/products
    @GetMapping
    public Result getProductList() {
        log.info("Query of Product List");
        List<ProductPage> list = productService.getProductList();
        return Result.success(list);
    }
}
