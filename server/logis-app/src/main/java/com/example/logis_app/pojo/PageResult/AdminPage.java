package main.java.com.example.logis_app.pojo.PageResult;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminPage extends UserPage {
   private String adminRole;
   private Integer departmentId;
   private LocalDateTime adminHirDateTime;
   private BigDecimal adminSalary;
}

