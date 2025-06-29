package com.example.logis_app.controller;

import com.example.logis_app.model.vo.LoginVO.LoginUser;
import com.example.logis_app.model.vo.ProductVO.ProductComment;
import com.example.logis_app.model.vo.ProductVO.ProductCommentList;
import com.example.logis_app.model.vo.ProductVO.ProductPage;
import com.example.logis_app.model.DTO.CartDTO.AddCartDTO;
import com.example.logis_app.model.DTO.ProductDTO.LikeDTO;
import com.example.logis_app.common.Result;
import com.example.logis_app.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public Result addToCart(@PathVariable Integer id, @RequestBody AddCartDTO addCartDTO) {
        LoginUser loginUser = (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Integer userId = loginUser.getUser().getUserId();
        addCartDTO.setItemId(id);
        addCartDTO.setUserId(userId);
        log.info("Add item to card : {}" , addCartDTO);
        productService.addToCard(addCartDTO);
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

    @PostMapping("/like")
    public Result updateLike( @RequestBody LikeDTO likeDTO) {
        LoginUser loginUser = (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Integer userId = loginUser.getUser().getUserId();
        likeDTO.setUserId(userId);
        log.info("Update like", likeDTO);
        productService.updateLike(likeDTO);
        return Result.success();
    }

    @GetMapping("/replies")
    public Result loadReplies(@RequestParam Integer parentId, @RequestParam Integer page , @RequestParam Integer pageLimit) {
        List<ProductCommentList> list = productService.loadReplies(parentId, page, pageLimit);
        for(ProductCommentList lsit : list) {
            log.info(lsit.toString());
        }
        return Result.success(list);
    }
}
