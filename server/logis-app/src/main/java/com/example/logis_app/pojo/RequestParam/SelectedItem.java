package com.example.logis_app.pojo.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SelectedItem {
    private Integer cartId;
    private Integer itemId;
    private Integer quantity;
    private Integer sizeId;
    private Integer userId;
}
