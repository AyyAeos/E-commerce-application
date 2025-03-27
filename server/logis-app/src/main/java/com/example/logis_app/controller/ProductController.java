package com.example.logis_app.controller;

import com.example.logis_app.pojo.PageResult.Product.CartPage;
import com.example.logis_app.pojo.PageResult.Product.ProductComment;
import com.example.logis_app.pojo.PageResult.Product.ProductPage;
import com.example.logis_app.pojo.RequestParam.AddItemToCartQueryParam;
import com.example.logis_app.pojo.RequestParam.AdminQueryParam;
import com.example.logis_app.pojo.Result;
import com.example.logis_app.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public Result getProductList() {
        log.info("Query of Product List");
        List<ProductPage> list = productService.getProductList();
        return Result.success(list);
    }

    @GetMapping("/{id}")
    public Result getSpecificProduct(@PathVariable Integer id) {
        log.info("Querying specific product ... ");
        ProductPage product = productService.getSpecificProduct(id);
        return Result.success(product);
    }

    @PostMapping("/{id}")
    public Result addToCart(@PathVariable Integer id, @RequestBody AddItemToCartQueryParam addItemToCartQueryParam) {
        addItemToCartQueryParam.setItemId(id);
        log.info("Add item to card : {}" , addItemToCartQueryParam);
        productService.addToCard(addItemToCartQueryParam);
        return Result.success();
    }

    @GetMapping("/{id}/{sizeId}")
    public Result checkPrice(@PathVariable Integer id, @PathVariable Integer sizeId){
        log.info("Querying size price with id . . .");
        BigDecimal price =  productService.checkPrice(sizeId);
        return Result.success(price);
    }

    @GetMapping("/{itemId}/review")
    public Result getReviewList(@PathVariable Integer itemId) {
        log.info("Get review list for item : {}", itemId);
        ProductComment productCommentList = productService.getReviewList(itemId);
        return  Result.success(productCommentList);
    }
}
