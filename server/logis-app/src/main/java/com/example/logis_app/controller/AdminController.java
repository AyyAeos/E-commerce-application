package com.example.logis_app.controller;

import java.util.List;

import com.example.logis_app.pojo.PageResult.UserPage;
import com.example.logis_app.pojo.RequestParam.AdminQueryParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.logis_app.pojo.Result;
import com.example.logis_app.service.AdminService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/emps")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public Result adminList() {
        log.info("Query admin list" );
        List<UserPage> userList = adminService.userList();
       return Result.success(userList);
    }

    @PostMapping
    public Result addNewAdmin(@RequestBody AdminQueryParam adminQueryParam) {
    log.info("New admin : {}" , adminQueryParam);
    adminService.addNewAdmin(adminQueryParam);
    return Result.success();
    }

    @PutMapping
    public Result modifyAdmin(@RequestBody AdminQueryParam adminQueryParam ){
        log.info("Modify admin : {}" , adminQueryParam);
        adminService.modifyAdmin(adminQueryParam);
        return Result.success();
    }

    @DeleteMapping
    public Result deleteAdmin(Integer id) {
        log.info("Admin id to delete : ");
        adminService.deleteAdmin(id);
        return Result.success();
    }

}
