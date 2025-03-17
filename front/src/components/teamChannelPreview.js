import React from "react";
import { Avatar, Card, Typography } from "antd";
import { useChatContext } from "stream-chat-react";
import { UserOutlined } from "@ant-design/icons";
import "../assets/css/teamChannelPreview.css";

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

    return (
      <>
        <div className="direct-preview">
          <Avatar
            src={members[0]?.user?.image}
            icon={<UserOutlined />}
            size={32}
            className="direct-avatar"
          />
          <Text className="direct-username">
            {members[0]?.user?.fullName || members[0]?.user?.id}
          </Text>
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
