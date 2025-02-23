package com.example.logis_app.pojo.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionQueryParam {
    private Integer page;
    private Integer pageLimit;
    private Integer transactionId;
    private String transactionType;
    private Integer itemId;
    private Double amount;
    private LocalDateTime transactionDate;

    // page limit
    private Integer start;

    //Query start end date
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private String description;

    //for expenses
    private String expenseType;

    //for supplier
    private String supplierId;

    // for user
    private Integer userId;




}
