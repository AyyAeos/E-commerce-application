package com.example.logis_app.pojo.PageResult.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductComment {

    //item comment table
    private Integer itemId;
    private Integer count;
    List<ProductCommentList> productCommentLists;



}
