import React, { useEffect, useState, useRef } from "react";
import { Message } from "./type";
import { filter } from "lodash";
import axiosInstance from "@/utils/axiosInstance";
import useSWR from "swr";

type onlineUserType = {
  userName: String;
  appointedStatus: boolean;
  role: String;
};

//Fetch user role and user name from server
const Chatbox = () => {
  const userFetcher = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      if (response.data.code === 1 && response.data.msg === "success") {
        return response.data.data;
      }
      throw new Error("User not authenticated");
    } catch (error) {
      return null;
    }
  };

  const {
    data,
    error: userError,
    isLoading: userLoading,
  } = useSWR("/logins/auth/me", userFetcher);

  const userRole = data?.role;
  const username = data?.userName;
  console.log("Username :", username);

  // Set up WebSocket connection only after user info is loaded
  useEffect(() => {
    if (!username) return;

    const cleanup = setupWebSocket();
    return cleanup;
  }, [username, userRole]);

  //Name message forward to
  const [toName, setToName] = useState<string>("");
  //all online user
  const [onlineUsers, setOnlineUsers] = useState<onlineUserType[]>([]);
  //chat message
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const [socket, setSocket] = useState<WebSocket | null>(null);
  //current input message
  const [messageText, setMessageText] = useState("");

  //target chatter
  const [selectedUser, setSelectedUser] = useState<string>("");

  //websocket connection status
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Connecting...");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000;

  // setup websocket
  const setupWebSocket = () => {
    //connect to a server
    const ws = new WebSocket("ws://localhost:8080/chats");

    ws.onopen = () => {
      setConnectionStatus("Connected");

      // Send initial registration message
      if (username) {
        const initialMessage = JSON.stringify({
          toName: "server",
          message: `${username} has joined the chat1.`,
          fromName: username,
          role: userRole,
          messageStatus: "OnOpen",
        });

        ws.send(initialMessage);
      }
    };

    //Received Message
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.isSystem) {
          //System Message used to update online and unassigned user.
          if (Array.isArray(data.message)) {
            setOnlineUsers(data.message);
          }
        } else {
          // Handle chat messages from user
          const senderName = data.fromName;
          const receiverName = username;

          // // Debug - print current username and roles
          // console.log("Current user:", username);
          // console.log("Current role:", userRole);
          // console.log("Message from:", senderName, "to:", receiverName);

          if (
            userRole === "CUSTOMER" &&
            (senderName === username || receiverName === username)
          ) {
            const otherUser =
              senderName === username ? receiverName : senderName;

            //set the message to the receiver
            setMessages((prev) => {
              const existingMessages = prev[otherUser] || [];
              const newMessage = {
                fromName: senderName,
                message: data.message,
                timestamp: new Date(
                  data.timestamp || Date.now()
                ).toLocaleTimeString(),
              };

              return {
                ...prev,
                [otherUser]: [...existingMessages, newMessage],
              };
            });

            //Select the User
            if (!selectedUser) {
              setSelectedUser(otherUser);
            }
          }

          // For admin
          if (userRole === "admin") {
            const relevantUser =
              senderName === username ? receiverName : senderName;

            setMessages((prev) => {
              const existingMessages = prev[relevantUser] || [];
              const newMessage = {
                fromName: senderName,
                message: data.message,
                timestamp: new Date(
                  data.timestamp || Date.now()
                ).toLocaleTimeString(),
              };

              return {
                ...prev,
                [relevantUser]: [...existingMessages, newMessage],
              };
            });

            if (!selectedUser) {
              setSelectedUser(relevantUser);
            }
          }
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onclose = (event) => {
      setConnectionStatus("Disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("Error connecting");
    };

    setSocket(ws);

    //clean up
    return () => {
      ws.close();
    };
  };

  // Set up WebSocket connection
  useEffect(() => {
    const cleanup = setupWebSocket();
    return cleanup;
  }, []);

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
    if (
      !messageText.trim() ||
      !toName ||
      !socket ||
      socket.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    const messageObj = {
      toName: toName,
      message: messageText,
      fromName: username,
      role: userRole,
    };

    socket.send(JSON.stringify(messageObj));

    //clear message
    setMessages((prev) => {
      const userMessages = prev[toName] || [];

      return {
        ...prev,
        [toName]: [
          ...userMessages,
          {
            fromName: username || "Me",
            message: messageText,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      };
    });

    setMessageText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Get current conversation messages
  const currentMessages = selectedUser ? messages[selectedUser] || [] : [];

  //Change online status of client to assigned
  const handleSelectedUser = (name: string) => {
    setSelectedUser(name);

    const removeMessage = JSON.stringify({
      toName: "server",
      message: `${username} has enter the chat room ${name}.`,
      fromName: name,
      messageStatus: "RemoveUser",
    });
    socket?.send(removeMessage);
  };

  return (
    <div className="flex min-h-screen bg-gray-200 justify-center items-center">
      <div className="max-w-4xl w-full bg-white flex rounded-lg shadow-xl overflow-hidden">
        {/* Chat panel */}
        <div
          className={`${
            userRole === "customer" ? "w-full" : "w-3/4"
          } p-4 flex flex-col`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">Chat</h3>
            <span
              className={`px-2 py-1 rounded text-sm ${
                connectionStatus === "Connected"
                  ? "bg-green-100 text-green-800"
                  : connectionStatus === "Disconnected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {connectionStatus}
            </span>
          </div>

          {selectedUser && (
            <p className="text-lg text-gray-700 mb-2">
              Chatting with: <span className="font-medium">{selectedUser}</span>
            </p>
          )}

          {!selectedUser ? (
            <p className="text-gray-500 mb-2">
              Select a user to start chatting
            </p>
          ) : (
            <p>Please Wait for an Admin to enter the chat.</p>
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
              placeholder={
                selectedUser
                  ? "Type a message..."
                  : userRole === "admin"
                    ? "Choose a user"
                    : "Please Wait an Admin to Enter the Chat"
              }
              disabled={!selectedUser || connectionStatus !== "Connected"}
            />
            <button
              onClick={sendMessage}
              disabled={
                !selectedUser ||
                !messageText.trim() ||
                connectionStatus !== "Connected"
              }
              className={`p-3 ${
                !selectedUser ||
                !messageText.trim() ||
                connectionStatus !== "Connected"
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
                onlineUsers
                //filter out admins
                  .filter((user) => user.role !== "admin")
                  .map((user, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer hover:bg-gray-700 transition ${
                        selectedUser === user.userName ? "bg-gray-700" : ""
                      }`}
                      onClick={() => handleSelectedUser(user.userName)}
                    >
                      <div className="p-3 border-b border-gray-700 flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            user.appointedStatus ? "bg-red-400" : "bg-green-400"
                          }`}
                        ></div>{" "}
                        <span>{user.userName}</span>
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
