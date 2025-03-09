package com.example.logis_app.pojo.PageResult.Order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private String orderId;
    private Integer userId;
    private LocalDateTime placedAt;
    private LocalDateTime updatedAt;
    private String status;
    private List<Item> items;
}
