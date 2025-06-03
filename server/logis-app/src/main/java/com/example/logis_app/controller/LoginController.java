package com.example.logis_app.controller;

import com.example.logis_app.pojo.vo.LoginVO.LoginUser;
import com.example.logis_app.pojo.DTO.LoginDTO.LoginDTO;
import com.example.logis_app.pojo.DTO.LoginDTO.RegisterDTO;
import com.example.logis_app.common.Result;
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
    private com.example.logis_app.service.LoginService loginService;

    @PostMapping
    public Result login(@RequestBody LoginDTO loginDTO) {
    log.info("Log in", loginDTO);
    LoginUser loginUser = loginService.login(loginDTO);
    return Result.success(loginUser);
    }

    @PostMapping("/register")
    public Result register(@RequestBody RegisterDTO registerDTO) {
        log.info("Register . . . ");
        try {
            boolean status = loginService.register(registerDTO);
            return Result.success(status);
        } catch (DataIntegrityViolationException ex) {
           throw ex;
        }
    }
}
