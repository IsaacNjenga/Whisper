import React, { useEffect, useState, useContext } from "react";
import { Channel, useChatContext, MessageSimple } from "stream-chat-react";
import ChatInner from "./chatInner";
import EditChannel from "./editChannel";
import "../assets/css/chatContainer.css";
import { Button, Card, Typography } from "antd";
import { ArrowLeftOutlined, MessageOutlined } from "@ant-design/icons";
import { UserContext } from "../App";

const { Text } = Typography;

function ChatContainer({ isEditing, setIsEditing }) {
  const { channel } = useChatContext();
  const [forceUpdate, setForceUpdate] = useState(false);
  const { isMobile, setActiveChat } = useContext(UserContext);
  //console.log(type);
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
      {" "}
      {/* Mobile Back Button */}
      {isMobile && (
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => setActiveChat(null)}
          style={{ marginBottom: "10px", fontSize: "16px", color: "#1890ff" }}
        >
          Back to Chats
        </Button>
      )}
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
