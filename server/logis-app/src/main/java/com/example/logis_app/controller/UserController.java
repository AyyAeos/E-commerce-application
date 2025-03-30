package com.example.logis_app.controller;

import com.example.logis_app.common.enums.UserRole;
import com.example.logis_app.pojo.vo.UserVO.UserPage;
import com.example.logis_app.common.Result;
import com.example.logis_app.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/admins/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public Result getUserList(@RequestParam Integer page, @RequestParam Integer pageLimit, @RequestParam String selection) {
        UserRole role = UserRole.valueOf(selection.toUpperCase());
        List<UserPage> userList = userService.getUserList(page, pageLimit, role);
        return Result.success(userList);
    }
}
