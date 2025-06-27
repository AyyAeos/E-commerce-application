package com.example.logis_app.common.filter;

import com.example.logis_app.model.vo.LoginVO.LoginUser;
import com.example.logis_app.common.util.JwtUtils;
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

        //Get token
       String token = request.getHeader("token");
       log.info("Jwt Token : {}", token);

       if(!StringUtils.hasText(token)) {
           // release
           filterChain.doFilter(request, response);
           return;
       }


        // parse token
        String username;
        try {
            Claims claims = JwtUtils.parseJWT(token);
            username = claims.getSubject();
            log.info("Parsed JWT claims: {}", claims);
        } catch (Exception e) {
            log.error("Error parsing JWT token: ", e);
            throw new RuntimeException("Invalid token");
        }


        //get data from redis
        String redisKey = "login:" + username;
        Object obj = redisTemplate.opsForValue().get("login:" + username);

        LoginUser loginUser = objectMapper.convertValue(obj, LoginUser.class);



    if (Objects.isNull(loginUser)) {
    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not logged in or session expired");
}



        //have a setAuthentic (true) flase
        //Stored in SecurityContextHolder
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginUser, null, null);
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        filterChain.doFilter(request, response);
    }
}
