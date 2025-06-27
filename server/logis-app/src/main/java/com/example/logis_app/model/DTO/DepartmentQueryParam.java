package com.example.logis_app.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentQueryParam {
    private Integer departmentId;
    private String departmentName;
    private String departmentDescription;
}
