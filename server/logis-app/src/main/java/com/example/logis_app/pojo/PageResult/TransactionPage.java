package com.example.logis_app.pojo.PageResult;

import com.example.logis_app.pojo.RequestParam.TransactionQueryParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
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
