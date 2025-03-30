package com.example.logis_app.Mapper;

import com.example.logis_app.pojo.vo.DepartmentPage;
import com.example.logis_app.pojo.DTO.DepartmentQueryParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface DepartmentMapper {
    List<DepartmentPage> findAllDepartment();

    void addNewDepartment(DepartmentQueryParam departmentQueryParam);

    void modifyDepartment(DepartmentQueryParam departmentQueryParam);

    void deleteDepartment(Integer id);
}
