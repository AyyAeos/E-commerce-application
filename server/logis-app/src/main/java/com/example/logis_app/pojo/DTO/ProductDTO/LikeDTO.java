package com.example.logis_app.pojo.DTO.ProductDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeDTO {

    private Integer userId;
    private Integer indexId;
    private Boolean like;

}
