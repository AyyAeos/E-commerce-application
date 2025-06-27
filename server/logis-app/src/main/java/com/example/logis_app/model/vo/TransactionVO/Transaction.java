package com.example.logis_app.model.vo.TransactionVO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Transaction {
    private Integer transactionId;
    private String transactionType;
    private Integer itemId;
    private Double amount;
    private LocalDateTime transactionDate;
    private String description;
}
