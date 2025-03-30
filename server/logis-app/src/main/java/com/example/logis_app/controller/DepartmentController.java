package com.example.logis_app.controller;

import com.example.logis_app.pojo.vo.DepartmentPage;
import com.example.logis_app.pojo.DTO.DepartmentQueryParam;
import com.example.logis_app.common.Result;
import com.example.logis_app.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/admins/selection/dept")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping
    public Result departmentList() {
        log.info("Query department list" );
        List<DepartmentPage> departmentList = departmentService.departmentList();
        return Result.success(departmentList);
    }

    @PostMapping
    public Result addNewDepartment(@RequestBody DepartmentQueryParam departmentQueryParam) {
        log.info("New department : {}" , departmentQueryParam);
        departmentService.addNewDepartment(departmentQueryParam);
        return Result.success();
    }

    @PutMapping("/{id}")
    public Result modifyDepartment(@PathVariable Integer id, @RequestBody DepartmentQueryParam departmentQueryParam ){
        departmentQueryParam.setDepartmentId(id);
        log.info("MOdify department : {}" , departmentQueryParam);
        departmentService.modifyDepartment(departmentQueryParam);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result deleteDepartment(@PathVariable Integer id) {
        log.info("Department id to delete : {} ", id);
        departmentService.deleteDepartment(id);
        return Result.success();
    }
}
