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

    @PostMapping("/create")
    public Result addNewTransaction(@RequestBody TransactionQueryParam transactionQueryParam) {
        log.info("Add new Transaction : {} ", transactionQueryParam);
        transactionService.addNewTransaction(transactionQueryParam);
        return Result.success();
    }
    @PutMapping
    public Result modifyTransaction(@RequestBody TransactionQueryParam transactionQueryParam) {
        log.info("Modify new Transaction : {}", transactionQueryParam);
        transactionService.modifyTransaction(transactionQueryParam);
        return Result.success();
    }

    @DeleteMapping
    public Result deleteTransaction(Integer id) {
        log.info("Transaction id to be deleted  : {}", id);
        transactionService.deleteTransaction(id);
        return Result.success();
    }





    
}
