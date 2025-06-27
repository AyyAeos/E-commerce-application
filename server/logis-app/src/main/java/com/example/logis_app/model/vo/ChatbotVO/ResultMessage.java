package com.example.logis_app.model.vo.ChatbotVO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultMessage {
    private  Boolean isSystem;
    private String fromName;
    private Object message;
}
