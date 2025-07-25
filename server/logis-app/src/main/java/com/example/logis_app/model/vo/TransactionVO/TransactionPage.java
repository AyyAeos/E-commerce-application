package com.example.logis_app.model.vo.TransactionVO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionPage {

    private List<Transaction> transaction;

    private Integer page;
    private Integer pageLimit;

    //To count total transaction
    private Integer totalCount;
}
