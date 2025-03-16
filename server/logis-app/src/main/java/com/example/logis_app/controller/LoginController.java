package com.example.logis_app.controller;

import com.example.logis_app.pojo.PageResult.LoginPage;
import com.example.logis_app.pojo.RequestParam.LoginQueryParam;
import com.example.logis_app.pojo.RequestParam.RegisterParam;
import com.example.logis_app.pojo.Result;
import com.example.logis_app.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/logins")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public Result login(@RequestBody LoginQueryParam loginQueryParam) {
    log.info("Log in", loginQueryParam);
    LoginPage loginPage = loginService.login(loginQueryParam);
    if(loginPage.getCredentails() == false) {
        return Result.error("Login Failed");
    }
    return Result.success(loginPage.getUserId());
    }

    @PostMapping("/register")
    public Result register(@RequestBody RegisterParam registerParam) {
        log.info("Register . . . ");
        try {
            boolean status = loginService.register(registerParam);
            return Result.success(status);
        } catch (DataIntegrityViolationException ex) {
           throw ex;
        }
    }
}
