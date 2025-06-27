package com.example.logis_app.model.DTO.ChatbotDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
//client to server DTO
public class Message {
    private String toName;
    private String message;
    private String username;
}
