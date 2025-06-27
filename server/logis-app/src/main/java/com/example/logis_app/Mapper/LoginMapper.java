package com.example.logis_app.Mapper;

import com.example.logis_app.model.DTO.LoginDTO.RegisterDTO;
import com.example.logis_app.model.vo.LoginVO.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    User login(String username);

    Integer register(RegisterDTO registerDTO);
}
