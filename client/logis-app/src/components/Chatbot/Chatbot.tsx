import React, { useEffect, useState, useRef } from "react";

interface Message {
  fromName: string;
  message: string;
  timestamp?: number | string;
}

interface SystemMessage {
  isSystem: boolean;
  message: string[] | string;
}

const Chatbox = () => {
  const userRole = localStorage.getItem("userRole");
  const username = localStorage.getItem("username");

  const [toName, setToName] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messageText, setMessageText] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<string>("Connecting...");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000;

  // Function to create and set up WebSocket
  const setupWebSocket = () => {
    const ws = new WebSocket("ws://localhost:8080/chats");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnectionStatus("Connected");
      setReconnectAttempts(0);
      
      // Send initial registration message
      if (username) {
        const initialMessage = JSON.stringify({
          toName: "server",
          message: `${username} has joined the chat.`,
          fromName: username
        });
        
        ws.send(initialMessage);
      }
    };

    ws.onmessage = (event) => {
      console.log("Raw message received:", event.data);
      
      try {
        const data = JSON.parse(event.data);
        
        if (data.isSystem) {
          // Handle system messages - like online users list
          console.log("System message received:", data);
          if (Array.isArray(data.message)) {
            // Filter out our own username from the list if needed
            const filteredUsers = userRole === "admin" 
              ? data.message
              : data.message.filter((name: string) => name !== username);
            
            setOnlineUsers(filteredUsers);
          }
        } else {
          // Handle chat messages
          console.log("Chat message received:", data);
          const fromUser = data.fromName;
          
          // Add message to conversation with this user
          setMessages(prev => {
            const userMessages = prev[fromUser] || [];
            
            return {
              ...prev,
              [fromUser]: [...userMessages, {
                fromName: fromUser,
                message: data.message,
                timestamp: data.timestamp 
                  ? new Date(data.timestamp).toLocaleTimeString()
                  : new Date().toLocaleTimeString()
              }]
            };
          });
          
          // If this user isn't selected yet, automatically select them
          if (!selectedUser && userRole === "admin") {
            setSelectedUser(fromUser);
          }
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed", event);
      setConnectionStatus("Disconnected");
      
      // Try to reconnect if not closed cleanly and within max attempts
      if (!event.wasClean && reconnectAttempts < maxReconnectAttempts) {
        console.log(`Attempting to reconnect (${reconnectAttempts + 1}/${maxReconnectAttempts})...`);
        setConnectionStatus(`Reconnecting (${reconnectAttempts + 1})...`);
        
        setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
          setupWebSocket();
        }, reconnectDelay);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("Error connecting");
    };

    setSocket(ws);
    
    // Return cleanup function
    return () => {
      ws.close();
    };
  };

  // Set up WebSocket connection on component mount
  useEffect(() => {
    const cleanup = setupWebSocket();
    return cleanup;
  }, [reconnectAttempts]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  // Update toName when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      setToName(selectedUser);
    }
  }, [selectedUser]);

  const sendMessage = () => {
    if (!messageText.trim() || !toName || !socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const messageObj = {
      toName: toName,
      message: messageText,
      fromName: username
    };

    socket.send(JSON.stringify(messageObj));
    
    // Add message to your own chat log immediately (for better UX)
    setMessages(prev => {
      const userMessages = prev[toName] || [];
      
      return {
        ...prev,
        [toName]: [...userMessages, {
          fromName: username || "Me",
          message: messageText,
          timestamp: new Date().toLocaleTimeString()
        }]
      };
    });
    
    setMessageText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Get current conversation messages
  const currentMessages = selectedUser ? (messages[selectedUser] || []) : [];

  return (
    <div className="flex min-h-screen bg-gray-200 justify-center items-center">
      <div className="max-w-4xl w-full bg-white flex rounded-lg shadow-xl overflow-hidden">
        {/* Chat panel */}
        <div className={`${userRole === "customer" ? "w-full" : "w-3/4"} p-4 flex flex-col`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Chat</h3>
            <span className={`px-2 py-1 rounded text-sm ${
              connectionStatus === "Connected" ? "bg-green-100 text-green-800" : 
              connectionStatus === "Disconnected" ? "bg-red-100 text-red-800" : 
              "bg-yellow-100 text-yellow-800"
            }`}>
              {connectionStatus}
            </span>
          </div>
          
          {selectedUser && (
            <p className="text-lg text-gray-700 mb-2">
              Chatting with: <span className="font-medium">{selectedUser}</span>
            </p>
          )}
          
          {!selectedUser && userRole === "admin" && (
            <p className="text-gray-500 mb-2">Select a user to start chatting</p>
          )}
          
          <div className="messages bg-gray-50 p-4 rounded-lg flex-grow h-96 overflow-y-auto">
            {currentMessages.length === 0 ? (
              <p className="text-gray-400 text-center mt-20">No messages yet</p>
            ) : (
              currentMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message mb-3 p-3 rounded-lg max-w-3/4 ${
                    msg.fromName === username 
                      ? "bg-blue-100 text-blue-900 ml-auto" 
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <div className="font-medium text-sm mb-1">
                    {msg.fromName === username ? "You" : msg.fromName}
                    {msg.timestamp && (
                      <span className="text-xs text-gray-500 ml-2">
                        {msg.timestamp}
                      </span>
                    )}
                  </div>
                  <div>{msg.message}</div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="mt-4 flex">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-3 border rounded-l text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder={selectedUser ? "Type a message..." : "Select a user to chat"}
              disabled={!selectedUser || connectionStatus !== "Connected"}
            />
            <button
              onClick={sendMessage}
              disabled={!selectedUser || !messageText.trim() || connectionStatus !== "Connected"}
              className={`p-3 ${
                !selectedUser || !messageText.trim() || connectionStatus !== "Connected"
                  ? "bg-gray-300 text-gray-500" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } rounded-r transition`}
            >
              Send
            </button>
          </div>
        </div>
        
        {/* User list panel for admins */}
        {userRole === "admin" && (
          <div className="w-1/4 bg-gray-800 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h4 className="font-medium">Online Users</h4>
            </div>
            <div className="overflow-y-auto flex-grow">
              {onlineUsers.length === 0 ? (
                <p className="text-gray-400 text-center p-4">No users online</p>
              ) : (
                onlineUsers.map((name, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer hover:bg-gray-700 transition ${
                      selectedUser === name ? "bg-gray-700" : ""
                    }`}
                    onClick={() => setSelectedUser(name)}
                  >
                    <div className="p-3 border-b border-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>{name}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;