package com.example.logis_app.controller;

import com.example.logis_app.pojo.PageResult.TransactionPage;
import com.example.logis_app.pojo.RequestParam.TransactionQueryParam;
import com.example.logis_app.pojo.Result;
import com.example.logis_app.service.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    //Default Page Display
    @GetMapping
    public Result getTransactionList() {
        log.info("Query of transaction list");
        TransactionPage list = transactionService.transactionList();
        return Result.success(list);
    }

    @PostMapping
    public Result queryTransaction(@RequestBody TransactionQueryParam transactionQueryParam){
        log.info("Query of specific transaction list : {}" , transactionQueryParam);
        TransactionPage list = transactionService.querySpecificTransaction(transactionQueryParam);
        return Result.success(list);
    }

    
}
