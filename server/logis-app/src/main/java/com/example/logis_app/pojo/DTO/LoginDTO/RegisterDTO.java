package com.example.logis_app.pojo.DTO.LoginDTO;

import com.example.logis_app.common.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
    private Integer userId;
    private String name;
    private String userPhone;
    private String username;
    private String password;
    private String email;
    private UserRole role = UserRole.CUSTOMER;
}
