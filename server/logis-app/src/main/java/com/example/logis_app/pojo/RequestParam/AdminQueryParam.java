package com.example.logis_app.pojo.RequestParam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AdminQueryParam {
    private String userFullName;
    private String userPhone;
    private String userRole;
    private String userCreateTime;
    private String userLastModifiedTime;
    private String username;
    private String password;
    private String email;
    private String adminRole;
    private Integer departmentId;
    private LocalDateTime adminHirDateTime;
    private BigDecimal adminSalary;
}
