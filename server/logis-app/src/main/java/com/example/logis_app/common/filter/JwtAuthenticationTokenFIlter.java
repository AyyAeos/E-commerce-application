package com.example.logis_app.common.filter;

import com.example.logis_app.model.vo.LoginVO.LoginUser;
import com.example.logis_app.common.util.JwtUtils;
import com.example.logis_app.model.vo.LoginVO.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Objects;
@Component
@Slf4j
//spring's concreate only 1 per time the normla one will got spammed
public class JwtAuthenticationTokenFIlter extends OncePerRequestFilter {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

            // 1. Get JWT token from cookies
            String token = null;
            if (request.getCookies() != null) {
                for (var cookie : request.getCookies()) {
                    if ("token".equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }

            log.info("JWT Token from cookie: {}", token);

            // 2. If no token, continue without authentication
            if (!StringUtils.hasText(token)) {
                filterChain.doFilter(request, response);
                return;
            }

            // 3. Parse JWT and extract subject (your user info JSON string)
            Claims claims;
            String subject;
            try {
                claims = JwtUtils.parseJWT(token);
                subject = claims.getSubject();
                log.info("Parsed JWT subject: {}", subject);
            } catch (Exception e) {
                log.error("Error parsing JWT token", e);
                throw new RuntimeException("Invalid token");
            }

            // 4. Convert subject (JSON string) to User object
            User user = new ObjectMapper().readValue(subject, User.class); // Or inject ObjectMapper
            LoginUser loginUser = new LoginUser(user);

            // 5. Set Authentication
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            // 6. Continue
            filterChain.doFilter(request, response);
        }
    }

