package com.example.logis_app.controller;

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

    @GetMapping("/auth/login")
    public ResponseEntity<Result> me(HttpServletRequest request) {
        // This assumes SecurityContext is already set by JWT filter
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Result(0, "unauthorized", null));
        }

        LoginUser user = (LoginUser) auth.getPrincipal(); // Cast to your custom user

        return ResponseEntity.ok(new Result(1, "success", user));
    }

    @GetMapping("/auth/me")
    public Result getCurrentUser() {
        LoginUser loginUser = (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Result.success(loginUser.getUser().getUserId());
    }

    @PostMapping("/logout")
    public ResponseEntity<Result> logout(HttpServletResponse response, HttpServletRequest request) {
        // 1. Clear cookie by setting empty and expired
        ResponseCookie clearedCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false) // same as login
                .path("/")
                .maxAge(0) // expires immediately
                .sameSite("Lax")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, clearedCookie.toString());

        // 2. Clear session if used
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // 3. Clear Spring Security context (if manually handled)
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok(new Result(1, "Logged out", null));
    }

    @PostMapping
    public ResponseEntity<Result> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        log.info("Log in: {}", loginDTO);

        String jwt = loginService.login(loginDTO);

        ResponseCookie jwtCookie = ResponseCookie.from("token", jwt)
                .httpOnly(true)
                .secure(false) // 🔒 true in production with HTTPS
                .path("/")
                .maxAge(-1)
                .sameSite("Lax")
                .build();

        // ✅ Now this will work
        response.setHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        return ResponseEntity.ok(new Result(1, "success", null));
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
