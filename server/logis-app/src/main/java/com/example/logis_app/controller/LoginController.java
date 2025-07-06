package com.example.logis_app.controller;

import com.example.logis_app.common.util.UserUtil;
import com.example.logis_app.model.vo.LoginVO.LoginUser;
import com.example.logis_app.model.DTO.LoginDTO.LoginDTO;
import com.example.logis_app.model.DTO.LoginDTO.RegisterDTO;
import com.example.logis_app.common.Result;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/logins")
public class LoginController {

    @Autowired
    private com.example.logis_app.service.LoginService loginService;

    // Route validation
    @GetMapping("/auth/login")
    public Result me(HttpServletRequest request) {
        LoginUser loginUser = UserUtil.getUser();
        if (loginUser == null) {
            return Result.error("Unauthorized"); 
        }
        return Result.success(loginUser);
    }

    // Get User Details
    @GetMapping("/auth/me")
    public Result getCurrentUser() {
        LoginUser loginUser = UserUtil.getUser();
        if (loginUser == null || loginUser.getUser() == null) {
            return Result.error("Unauthorized");
        }
        return Result.success(loginUser.getUser());
    }

    @PostMapping("/logout")
    public Result logout(HttpServletResponse response, HttpServletRequest request) {
        // Clear cookie by setting empty and expired
        ResponseCookie clearedCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0) // expires immediately
                .sameSite("Lax")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, clearedCookie.toString());

        // Clear session
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        //clear in context
        SecurityContextHolder.clearContext();

        return Result.success("logged out");
    }

    @PostMapping
    public Result login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        log.info("Log in: {}", loginDTO);
        String jwt = loginService.login(loginDTO);
        ResponseCookie jwtCookie = ResponseCookie.from("token", jwt)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(900)
                .sameSite("Lax")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        return Result.success("success");
    }

    @PostMapping("/register")
    public Result register(@RequestBody RegisterDTO registerDTO) {
        log.info("Register . . . ");
            boolean status = loginService.register(registerDTO);
            return Result.success(status);
    }
}
