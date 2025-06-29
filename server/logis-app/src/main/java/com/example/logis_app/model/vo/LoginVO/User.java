package com.example.logis_app.model.vo.LoginVO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer userId;
    @JsonIgnore
    private String name;
    @JsonIgnore
    private String userPhone;
    private String userName;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private String email;
    private UserRole role;
}
