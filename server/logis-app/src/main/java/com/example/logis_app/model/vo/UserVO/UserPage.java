package com.example.logis_app.model.vo.UserVO;

import com.example.logis_app.common.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPage {

    private Integer userId;
    private String name;
    private String userPhone;
    private LocalDateTime userCreateTime;
    private LocalDateTime userLastModifiedTime;
    private String username;
    private String password;
    private String email;
    private UserRole role;
    private Integer departmentId;
}
