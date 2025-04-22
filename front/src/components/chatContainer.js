import React, { useEffect, useState } from "react";
import { Channel, useChatContext, MessageSimple } from "stream-chat-react";
import ChatInner from "./chatInner";
import EditChannel from "./editChannel";
import "../assets/css/chatContainer.css";
import { Card, Modal, Typography, Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import VideoChat from "./videoChat";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const { Text } = Typography;

function ChatContainer({ isEditing, setIsEditing }) {
  const { channel } = useChatContext();
  const [incomingCallId, setIncomingCallId] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [showIncomingModal, setShowIncomingModal] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    if (channel) setForceUpdate((prev) => !prev);
  }, [channel]);

  useEffect(() => {
    if (!channel) return;

    const handleIncomingCall = (event) => {
      if (event.message?.type === "video-call" && event.message?.callId) {
        setIncomingCallId(event.message.callId);
        setShowIncomingModal(true);
      }
    };

    channel.on("message.new", handleIncomingCall);
    return () => channel.off("message.new", handleIncomingCall);
  }, [channel]);

  const handleAcceptCall = () => {
    setShowIncomingModal(false);
    setIsVideoVisible(true); // Will trigger <VideoChat />
  };

  const handleDeclineCall = () => {
    setIncomingCallId(null);
    setShowIncomingModal(false);
  };

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
      </Channel>{" "}
      {incomingCallId && (
        <VideoChat
          callId={incomingCallId}
          isVisible={isVideoVisible}
          setIsVisible={setIsVideoVisible}
        />
      )}
      {/* Incoming Call Notification Modal */}
      <Modal
        open={showIncomingModal}
        title="Incoming Video Call"
        onCancel={handleDeclineCall}
        footer={[
          <Button key="decline" danger onClick={handleDeclineCall}>
            Decline
          </Button>,
          <Button key="accept" type="primary" onClick={handleAcceptCall}>
            Accept
          </Button>,
        ]}
      >
        <p>You are receiving a video call. Would you like to join?</p>
      </Modal>
    </div>
  );
}

export default ChatContainer;
