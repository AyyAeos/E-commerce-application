package com.example.logis_app.websocket;

import com.example.logis_app.model.DTO.ChatbotDTO.UserStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.catalina.Server;
import org.apache.catalina.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatEndPoint extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(ChatEndPoint.class);

    // Keep track of connected users by username and session
    private static final Map<UserStatus, WebSocketSession> onlineUsers = new ConcurrentHashMap<>();

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        logger.info("WebSocket connected: {}", session.getId());

        // Send a confirmation message to the client
        Map<String, Object> confirmation = Map.of(
                "type", "connection",
                "status", "success",
                "message", "WebSocket connection established successfully."
        );

        String json = new ObjectMapper().writeValueAsString(confirmation);
        session.sendMessage(new TextMessage(json));
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            logger.info("Received message: {}", message.getPayload());

            Map<String, Object> messageMap = mapper.readValue(message.getPayload(), Map.class);
            String toName = (String) messageMap.get("toName");
            String messageContent = (String) messageMap.get("message");
            String fromName = (String) messageMap.get("fromName");
            logger.info("session : {}" , session);

            //Server message
            if ("server".equals(toName)) {
                String statusStr = (String) messageMap.get("messageStatus");

                if (statusStr != null) {
                    //Convert to enum
                    ServerMessageType messageStatus = ServerMessageType.valueOf(statusStr);
                    logger.info("Message status: {}", messageStatus);
                    /**
                     * All client will show in the list.
                     * If the client have not assigned by any admin, it appears green
                     * If admin clicked to chat with client , set false and remove user from online user.
                     */
                    //Unassigned new client
                    if (messageStatus == ServerMessageType.OnOpen && !onlineUsers.containsKey(fromName)) {
                    
                        onlineUsers.put(new UserStatus(fromName, false), session);
                        logger.info("User {} registered", fromName);
                        broadcastOnlineUsers();
                        //Assigned client
                    } else if (messageStatus == ServerMessageType.RemoveUser) {
                        UserStatus oldKey = new UserStatus(fromName, false);
                        WebSocketSession existingSession = onlineUsers.remove(oldKey);
                        if (existingSession != null) {
                            onlineUsers.put(new UserStatus(fromName, true), existingSession);
                        }
                        logger.info("User {} removed from unappointed", fromName);
                        broadcastOnlineUsers();
                    }
                } else {
                    logger.warn("Missing messageStatus for server message");
                }
                return;
            }

            // Send to specific user
            WebSocketSession recipientSession = null;

            for (Map.Entry<UserStatus, WebSocketSession> entry : onlineUsers.entrySet()) {
                if (entry.getKey().getUserName().equals(toName)) {
                    recipientSession = entry.getValue();
                    break;
                }
            }
            if (recipientSession != null && recipientSession.isOpen()) {
                String formattedMessage = mapper.writeValueAsString(Map.of(
                        "fromName", fromName,
                        "message", messageContent,
                        "timestamp", System.currentTimeMillis()
                ));
                recipientSession.sendMessage(new TextMessage(formattedMessage));
                logger.info("Message sent from {} to {}. The message is {}", fromName ,toName, formattedMessage);
            } else {
                logger.warn("User {} is offline", fromName);
            }

        } catch (Exception e) {
            logger.error("Error handling message", e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        UserStatus disconnectedUser = getUsernameBySession(session);
        if (disconnectedUser != null) {
            onlineUsers.remove(disconnectedUser);
            logger.info("User {} disconnected and removed from online list", disconnectedUser);
            broadcastOnlineUsers();
        } else {
            logger.info("A session disconnected: {}", session.getId());
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        logger.error("WebSocket transport error", exception);
        // Handle cleanup
        afterConnectionClosed(session, CloseStatus.SERVER_ERROR);
    }

    //Broadcast all online user for admins
    private void broadcastOnlineUsers() {
        try {
            List<UserStatus> usernames = new ArrayList<>(onlineUsers.keySet());
            String systemMessage = mapper.writeValueAsString(Map.of(
                    "isSystem", true,
                    "message", usernames
            ));
            for (WebSocketSession session : onlineUsers.values()) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(systemMessage));
                }
            }
            logger.info("Broadcasted online users: {}", usernames);
        } catch (Exception e) {
            logger.error("Error broadcasting online users", e);
        }
    }

    private UserStatus getUsernameBySession(WebSocketSession session) {
        for (Map.Entry<UserStatus, WebSocketSession> entry : onlineUsers.entrySet()) {
            if (entry.getValue().getId().equals(session.getId())) {
                return entry.getKey();
            }
        }
        return null;
    }
}