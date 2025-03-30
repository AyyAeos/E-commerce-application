package com.example.logis_app.pojo.vo.ProductVO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
