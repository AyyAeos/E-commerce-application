package com.example.logis_app.common.util.MessageUtils;

import com.example.logis_app.model.vo.ChatbotVO.ResultMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MessageUtils {

    public static String getMessage(boolean isSystemMessage, String fromName, Object message) {
        try{
            ResultMessage resultMessage= new ResultMessage();
            resultMessage.setIsSystem(isSystemMessage);
            resultMessage.setMessage(message);
            if(fromName != null) {
                resultMessage.setFromName(fromName);
            }
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(resultMessage);
        }catch (JsonProcessingException e) {
            e.printStackTrace();

        }
        return null;
    }
}
