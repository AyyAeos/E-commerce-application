package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.DepartmentMapper;
import com.example.logis_app.pojo.PageResult.DepartmentPage;
import com.example.logis_app.pojo.RequestParam.DepartmentQueryParam;
import com.example.logis_app.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentMapper departmentMapper;

    @Override
    public List<DepartmentPage> departmentList() {
       return departmentMapper.findAllDepartment();
    }

    @Override
    public void addNewDepartment(DepartmentQueryParam departmentQueryParam) {
    departmentMapper.addNewDepartment(departmentQueryParam);
    }

    @Override
    public void modifyDepartment(DepartmentQueryParam departmentQueryParam) {
    departmentMapper.modifyDepartment(departmentQueryParam);
    }

    @Override
    public void deleteDepartment(Integer id) {
    departmentMapper.deleteDepartment(id);
    }
}
