package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.LoginMapper;
import com.example.logis_app.pojo.vo.LoginVO.LoginUser;
import com.example.logis_app.pojo.DTO.LoginDTO.LoginDTO;
import com.example.logis_app.pojo.DTO.LoginDTO.RegisterDTO;
import com.example.logis_app.pojo.vo.LoginVO.User;
import com.example.logis_app.service.LoginService;
import com.example.logis_app.util.JwtUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@Transactional
public class LoginServiceImpl implements UserDetailsService, LoginService {
    @Autowired
    private LoginMapper loginMapper;
        //authentication manager authentic to verify user

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public LoginUser login(LoginDTO loginDTO) {

        // Authenticate the user
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // If authentication fails, throw an exception
        if (Objects.isNull(authentication)) {
            throw new RuntimeException("Login failed");
        }

        // Get the authenticated user details
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        String username = loginUser.getUser().getUserName();

        // Generate JWT token
        String jwt = JwtUtils.createJWT(username);

        // Store the token in Redis (optional)
        String redisKey = "login:" + loginUser.getUser().getUserName();
        log.info(redisKey);



        redisTemplate.opsForValue().set(redisKey, loginUser);
        redisTemplate.expire(redisKey, 30, TimeUnit.MINUTES);

        loginUser.setJwt(jwt);

        return loginUser;
    }


    @Override
    public LoginUser loadUserByUsername(String username) throws UsernameNotFoundException {
     

        User user = loginMapper.login(username);

        if(Objects.isNull(user)) {
            throw new RuntimeException("Login failed , Wrong username or password");
        }

        return new LoginUser(user);

    }

//    @Override
//    public LoginPage login(LoginDTO loginDTO) {
//        LoginPage loginPage=  loginMapper.login(loginDTO);
//
//        if (loginPage == null || !loginDTO.getPassword().equals(loginPage.getPassword())) {
//            loginPage.setCredentails(false);
//        }
//        return new LoginPage(loginPage.getCredentails(), loginPage.getUserId(), loginPage.getPassword());
//    }


    @Override
    public Boolean register(RegisterDTO registerDTO) {
        // Encode the password before saving to the database
        String encodedPassword = passwordEncoder.encode(registerDTO.getPassword());
        registerDTO.setPassword(encodedPassword);
        return loginMapper.register(registerDTO) > 0;

    }

}
