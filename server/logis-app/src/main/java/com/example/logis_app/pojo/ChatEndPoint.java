package com.example.logis_app.pojo;

import com.example.logis_app.pojo.DTO.ChatbotDTO.Message;
import com.example.logis_app.util.MessageUtils.MessageUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@ServerEndpoint(value = "/chats", configurator = GetHttpSessionConfiguration.class)
public class ChatEndPoint {

    private static final Logger logger = LoggerFactory.getLogger(ChatEndPoint.class);
    private static Map<String, ChatEndPoint> onlineUsers = new ConcurrentHashMap<>();

    // WebSocket session //send message to specific client
    private Session session;

    // Servlet session if needed
    private HttpSession httpSession;

    // Store username for this endpoint
    private String username;

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) {
        this.session = session;

        // Retrieve the HttpSession from the user properties
        this.httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());

        if (this.httpSession != null) {
            // Try to get username from HttpSession
            this.username = (String) httpSession.getAttribute("username");
            logger.info("WebSocket opened. Username from session: {}", username);
        } else {
            logger.error("HttpSession is null in onOpen.");
        }

        // Don't register the user yet - wait for the first message which will contain user info
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        logger.info("Received message: {}", message);

        ObjectMapper mapper = new ObjectMapper();
        try {
            // Parse the incoming message
            Map<String, Object> messageMap = mapper.readValue(message, Map.class);
            String toName = (String) messageMap.get("toName");
            String messageContent = (String) messageMap.get("message");
            String fromName = (String) messageMap.get("fromName");

            // If this is the first message and username is null, register the user
            if (this.username == null && fromName != null) {
                this.username = fromName;
                onlineUsers.put(fromName, this);
                logger.info("User {} registered from message data", fromName);

                // Broadcast online users to everyone
                broadcastOnlineUsers();
                return;
            }

            // Check if this is a special message to the server
            if ("server".equals(toName)) {
                // This is a system message - perhaps a join notification
                logger.info("System message received: {}", messageContent);
                return;
            }

            // Regular chat message
            ChatEndPoint recipient = onlineUsers.get(toName);
            if (recipient != null && recipient.session.isOpen()) {
                // Format the message for the recipient
                String formattedMessage = mapper.writeValueAsString(
                        Map.of(
                                "fromName", fromName,
                                "message", messageContent,
                                "timestamp", System.currentTimeMillis()
                        )
                );

                recipient.session.getBasicRemote().sendText(formattedMessage);
                logger.info("Message sent to {}", toName);
            } else {
                logger.warn("Cannot send message. User {} is offline", toName);
                // You might want to store the message for later delivery
            }
        } catch (Exception e) {
            logger.error("Error processing message", e);
        }
    }

    @OnClose
    public void onClose(Session session) {
        logger.info("WebSocket closed for user: {}", username);

        if (username != null) {
            onlineUsers.remove(username);
            logger.info("User {} removed from online users", username);

            // Broadcast updated online users list
            broadcastOnlineUsers();
        } else {
            logger.warn("Cannot remove user from online users - username is null");
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        logger.error("WebSocket error for user {}: {}", username, throwable.getMessage());
        throwable.printStackTrace();

        // On error, make sure to remove the user from online users
        if (username != null) {
            onlineUsers.remove(username);
            broadcastOnlineUsers();
        }
    }

    /**
     * Broadcasts the list of online users to all connected clients
     */
    private void broadcastOnlineUsers() {
        try {
            // Create a list of online usernames
            List<String> usernames = new ArrayList<>(onlineUsers.keySet());

            // Create a system message with the list
            String systemMessage = new ObjectMapper().writeValueAsString(
                    Map.of(
                            "isSystem", true,
                            "message", usernames
                    )
            );

            // Send to all connected users
            for (ChatEndPoint endpoint : onlineUsers.values()) {
                if (endpoint.session.isOpen()) {
                    endpoint.session.getBasicRemote().sendText(systemMessage);
                }
            }

            logger.info("Broadcasted online users list: {}", usernames);
        } catch (IOException e) {
            logger.error("Error broadcasting online users", e);
        }
    }
}