package com.example.logis_app.model.DTO.ChatbotDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserStatus {
    private String userName;
    private String role;
    private boolean appointedStatus;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserStatus that = (UserStatus) o;
        return appointedStatus == that.appointedStatus && Objects.equals(userName, that.userName) && Objects.equals(role, that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userName, role, appointedStatus);
    }

    @Override
    public String toString() {
        return "UserStatus{" +
                "userName='" + userName + '\'' +
                ", role='" + role + '\'' +
                ", appointedStatus=" + appointedStatus +
                '}';
    }
}