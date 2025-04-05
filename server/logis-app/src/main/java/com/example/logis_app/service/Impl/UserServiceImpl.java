package com.example.logis_app.service.Impl;

import com.example.logis_app.Mapper.UserMapper;
import com.example.logis_app.common.enums.UserRole;
import com.example.logis_app.pojo.vo.UserVO.UserPage;
import com.example.logis_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;



    @Override
    public List<UserPage> getUserList(Integer page, Integer pageLimit, UserRole role) {
        Integer start = (page - 1 ) * pageLimit;
        return userMapper.getUserList(start, pageLimit, role);
    }
}
