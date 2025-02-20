package com.example.logis_app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.logis_app.pojo.Result;
import com.example.logis_app.pojo.User;
import com.example.logis_app.service.AdminService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;



@Slf4j
@RestController
@RequestMapping("/emps")
public class AdminController {

    @Autowired
    private AdminService adminService;

    /*
     * Getting all the user list
     * 
     */
    @GetMapping
    public Result userList() {
        List<User> userList = adminService.userList();
       return Result.success(userList);
    }

}
