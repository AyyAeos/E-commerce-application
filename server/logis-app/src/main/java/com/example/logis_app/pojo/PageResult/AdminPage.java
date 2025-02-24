package com.example.logis_app.pojo.PageResult;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminPage   {
   private Integer userId;
   private String name;
   private String userPhone;
   private Integer departmentId;
   private BigDecimal adminSalary;
   private LocalDateTime adminHireDate;
   private String adminRole;
   private String email;
   private String username;
   private String password;
   private LocalDateTime userLastModifiedTime;
}

