package com.example.logis_app.controller;

import java.util.List;

import com.example.logis_app.pojo.PageResult.AdminPage;
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
@RequestMapping("/admins/selection/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public Result adminList() {
        log.info("Query admin list" );
        List<AdminPage> userList = adminService.userList();
       return Result.success(userList);
    }

    @PostMapping
    public Result addNewAdmin(@RequestBody AdminQueryParam adminQueryParam) {
    log.info("New admin : {}" , adminQueryParam);
    adminService.addNewAdmin(adminQueryParam);
    return Result.success();
    }

    @PutMapping("/{id}")
    public Result modifyAdmin( @PathVariable Integer id ,@RequestBody AdminQueryParam adminQueryParam ){
        adminQueryParam.setUserId(id);
        log.info("Modify admin : {}" , adminQueryParam);
        adminService.modifyAdmin(adminQueryParam);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result deleteAdmin(@PathVariable Integer id) {
        log.info("Admin id to delete : ");
        adminService.deleteAdmin(id);
        return Result.success();
    }

}
