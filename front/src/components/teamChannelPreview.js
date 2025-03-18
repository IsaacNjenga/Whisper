import React from "react";
import { Avatar, Card, Typography } from "antd";
import { useChatContext } from "stream-chat-react";
import { UserOutlined } from "@ant-design/icons";
import "../assets/css/teamChannelPreview.css";
import { formatDistanceToNow } from "date-fns";

const { Text } = Typography;

function TeamChannelPreview({
  channel,
  type,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}) {
  const { client } = useChatContext();

  const ChannelPreview = () => (
    <Text strong className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </Text>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    console.log(members);
    const user = members[0]?.user;
    const lastMessage =
      channel.state.messages[channel.state.messages.length - 1];

    return (
      <>
        <div className="direct-preview">
          <Avatar
            src={user?.image}
            icon={<UserOutlined />}
            size={32}
            className="direct-avatar"
          />
          <div className="direct-info">
            <Text className="direct-username">
              {user?.fullName || user?.id}
            </Text>
            <div className="direct-message-container">
              <Text className="direct-message">
                {lastMessage
                  ? `${lastMessage.user.id === client.userID ? "You: " : ""}${
                      lastMessage.text || "Sent an attachment"
                    }`
                  : "No messages yet"}
              </Text>
              {lastMessage?.created_at && (
                <Text className="message-time">
                  {formatDistanceToNow(new Date(lastMessage.created_at), {
                    addSuffix: true,
                  })}
                </Text>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
      }}
      className="team-channel-preview"
      hoverable
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </Card>
  );
}

export default TeamChannelPreview;
