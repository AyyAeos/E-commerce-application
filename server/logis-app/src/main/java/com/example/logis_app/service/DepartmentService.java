package com.example.logis_app.service;

import com.example.logis_app.pojo.PageResult.DepartmentPage;
import com.example.logis_app.pojo.RequestParam.DepartmentQueryParam;

import java.util.List;

public interface DepartmentService {

    List<DepartmentPage> departmentList();

    void addNewDepartment(DepartmentQueryParam departmentQueryParam);

    void modifyDepartment(DepartmentQueryParam departmentQueryParam);

    void deleteDepartment(Integer id);
}
