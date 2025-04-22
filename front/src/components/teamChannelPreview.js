import React, { useContext } from "react";
import { Avatar, Badge, Card, Typography } from "antd";
import { useChatContext } from "stream-chat-react";
import { UserOutlined } from "@ant-design/icons";
import "../assets/css/teamChannelPreview.css";
import { formatDistanceToNow } from "date-fns";
import { UserContext } from "../App";

const { Text } = Typography;

function TeamChannelPreview({
  channel,
  type,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}) {
  const { client } = useChatContext();
  const {  setActiveChat } = useContext(UserContext);
  const ChannelPreview = ({ channel }) => (
    <Text
      strong
      className="channel-preview__item"
      onClick={() => setActiveChat(channel)}
    >
      # {channel?.data?.name || channel?.data?.id}
    </Text>
  );

  const DirectPreview = ({ channel, client }) => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user?.id !== client.userID
    );

    const user = members[0]?.user;
    const lastMessage =
      channel.state.messages[channel.state.messages.length - 1];

    // Get last read time of recipient
    const recipientReadTime = channel.state.read[user?.id]?.last_read;
    const isUnread =
      lastMessage && recipientReadTime
        ? new Date(lastMessage.created_at) > new Date(recipientReadTime)
        : false;

    return (
      <div className="direct-preview" onClick={() => setActiveChat(channel)}>
        <Avatar
          src={user?.image}
          icon={<UserOutlined />}
          size={50}
          className="direct-avatar"
        />
        <div className="direct-info">
          <Text className="direct-username">{user?.fullName || user?.id}</Text>
          <div className="direct-message-container">
            <Text
              className={`direct-message ${isUnread ? "unread-message" : ""}`}
            >
              {lastMessage
                ? `${lastMessage.user.id === client.userID ? "" : ""}${
                    (lastMessage.text || "Sent an attachment").length > 50
                      ? (lastMessage.text || "Sent an attachment").slice(
                          0,
                          33
                        ) + "..."
                      : lastMessage.text || "Sent an attachment"
                  }`
                : "No messages yet"}
            </Text>
            {lastMessage?.created_at && (
              <Text className="message-time">
                {formatDistanceToNow(new Date(lastMessage.created_at), {
                  addSuffix: false,
                })}
              </Text>
            )}
          </div>
        </div>
        {isUnread && <Badge color="green" className="unread-badge" />}
      </div>
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
      {type === "team" ? (
        <ChannelPreview channel={channel} />
      ) : (
        <DirectPreview channel={channel} client={client} />
      )}
    </Card>
  );
}

export default TeamChannelPreview;
