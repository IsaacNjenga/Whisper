import React, { useState, useEffect } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  //Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";
import "../assets/css/chatInner.css";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { formatDistanceToNow } from "date-fns";

export const GiphyContext = React.createContext({});

const ChatInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div className="chat-container">
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  const [watcherCount, setWatcherCount] = useState(
    channel?.state?.watcher_count || 0
  );

  // 📌 Update watcher count dynamically
  useEffect(() => {
    const handleWatcherUpdate = () => {
      setWatcherCount(channel?.state?.watcher_count || 0);
    };

    channel.on("user.watching.start", handleWatcherUpdate);
    channel.on("user.watching.stop", handleWatcherUpdate);

    return () => {
      channel.off("user.watching.start", handleWatcherUpdate);
      channel.off("user.watching.stop", handleWatcherUpdate);
    };
  }, [channel]);

  const MessagingHeader = () => {
    const members = Object.values(channel?.state?.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;
  
    const user = members[0]?.user;
    const isOnline = user?.online;
    const lastActive = user?.last_active ? new Date(user.last_active) : null;
  
    if (channel.type === "messaging") {
      return (
        <div className="channel-header">
          {members.map(({ user }, i) => (
            <div key={i} className="member-info">
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={45}
                style={{
                  border: isOnline ? "2px solid green" : "2px solid gray",
                }}
              />
              <div className="member-details">
                <p className="member-name">{user.fullName || user.id}</p>
                <p className="member-status">
                  {isOnline
                    ? "Online"
                    : lastActive
                    ? `Active ${formatDistanceToNow(lastActive, {
                        addSuffix: true,
                      })}`
                    : "Offline"}
                </p>
              </div>
            </div>
          ))}
          {additionalMembers > 0 && (
            <p className="member-extra">+{additionalMembers} more</p>
          )}
        </div>
      );
    }
  
    return (
      <div className="channel-info">
        <p className="channel-name"># {channel.data.name}</p>
        <span
          className="edit-channel"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          <InfoCircleOutlined />
        </span>
        <div>
          <Avatar.Group
            max={channel?._data?.members?.length || 1}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              borderRadius: "12px",
            }}
          >
            {members.map((member, index) => {
              const user = member.user || {};
              return (
                <Tooltip
                  key={user.id || index}
                  title={user.name || "User "}
                  placement="top"
                >
                  <Avatar
                    src={
                      user.image ||
                      `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                    }
                    icon={!user.image && <UserOutlined />}
                  />
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </div>
      </div>
    );
  };
  const getWatcherText = () => {
    if (!watcherCount && channel.type === "messaging")
      return <p className="offline-text">Offline</p>;
    if (watcherCount === 1 && channel.type === "messaging")
      return <p className="offline-text">offline</p>;
    if (watcherCount > 1 && channel.type === "messaging")
      return <p className="online-text">online</p>;
    if (channel.type === "team")
      return <p className="online-text">{watcherCount} online</p>;
  };

  return (
    <div className="header-container">
      <MessagingHeader />
      <div className="online-status">{getWatcherText()}</div>
    </div>
  );
};

export default ChatInner;
