package com.example.logis_app.websocket;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.HandshakeResponse;
import jakarta.websocket.server.HandshakeRequest;
import jakarta.websocket.server.ServerEndpointConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHttpSessionConfiguration extends ServerEndpointConfig.Configurator {
    private static final Logger logger = LoggerFactory.getLogger(GetHttpSessionConfiguration.class);

    @Override
    public void modifyHandshake(ServerEndpointConfig sec, HandshakeRequest request, HandshakeResponse response) {
        logger.info("Modifying handshake for WebSocket connection");

        // Extract the HttpSession from the HandshakeRequest
        HttpSession httpSession = (HttpSession) request.getHttpSession();

        if (httpSession != null) {
            // Store the HttpSession in the UserProperties of the WebSocket session
            sec.getUserProperties().put(HttpSession.class.getName(), httpSession);
            logger.info("HttpSession successfully attached to WebSocket");

            // Log the username to verify it's available
            String username = (String) httpSession.getAttribute("username");
            logger.info("Username from HttpSession: {}", username);
        } else {
            logger.error("HttpSession is null during WebSocket handshake");
        }

        super.modifyHandshake(sec, request, response);
    }
}