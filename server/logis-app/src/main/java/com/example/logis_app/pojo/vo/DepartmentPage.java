package com.example.logis_app.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentPage {
    private Integer departmentId;
    private String departmentName;
    private String departmentDescription;
}
