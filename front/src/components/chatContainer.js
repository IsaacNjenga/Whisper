import React, { useEffect, useState } from "react";
import { Channel, useChatContext, MessageSimple } from "stream-chat-react";
import ChatInner from "./chatInner";
import EditChannel from "./editChannel";
import "../assets/css/chatContainer.css";
import { Card, Typography } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const { Text } = Typography;

function ChatContainer({ isEditing, setIsEditing }) {
  const { channel } = useChatContext();
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    if (channel) setForceUpdate((prev) => !prev);
  }, [channel]);

  if (isEditing) {
    return (
      <div>
        <EditChannel />
      </div>
    );
  }

  if (!channel || !channel.id) {
    return (
      <Card
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          border: "1px dashed #ddd",
          borderRadius: "8px",
          margin: "20px",
        }}
      >
        <MessageOutlined style={{ fontSize: "40px", color: "#888" }} />
        <Text
          style={{
            display: "block",
            marginTop: "10px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Select a chat to start messaging
        </Text>
        <Text style={{ display: "block", marginTop: "5px", color: "#666" }}>
          Choose a conversation from the list to begin.
        </Text>
      </Card>
    );
  }

  const EmptyState = () => (
    <div className="empty-state">
      <p>Send messages, attachments, and more</p>
    </div>
  );

  return (
    <div className="channel-container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => (
          <MessageSimple key={i} {...messageProps} />
        )}
      >
        <ChatInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
}

export default ChatContainer;
