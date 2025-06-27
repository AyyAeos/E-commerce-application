package com.example.logis_app.service;

import com.example.logis_app.model.vo.DepartmentPage;
import com.example.logis_app.model.DTO.DepartmentQueryParam;

import java.util.List;

public interface DepartmentService {

    List<DepartmentPage> departmentList();

    void addNewDepartment(DepartmentQueryParam departmentQueryParam);

    void modifyDepartment(DepartmentQueryParam departmentQueryParam);

    void deleteDepartment(Integer id);
}
