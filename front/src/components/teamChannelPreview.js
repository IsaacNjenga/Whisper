import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

function TeamChannelPreview({
  channel,
  type,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}) {
  //removed activeChannel
  const { client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  };

  return (
    <div
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
      }}
    >
      {/* This page will now display the chats and recent messages */}
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
}

export default TeamChannelPreview;
