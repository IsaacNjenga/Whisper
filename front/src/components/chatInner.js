import React, { useState, useEffect } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";
import "../assets/css/chatInner.css";

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
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    if (channel.type === "messaging") {
      return (
        <div className="channel-header">
          {members.map(({ user }, i) => (
            <div key={i} className="member-info">
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={32}
              />
              <p className="member-name">{user.fullName || user.id}</p>
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
        <span className="edit-channel" onClick={() => setIsEditing(true)}>
          ℹ️
        </span>
      </div>
    );
  };

  const getWatcherText = () => {
    if (!watcherCount) return <p className="offline-text">Offline</p>;
    if (watcherCount === 1) return <p className="offline-text">offline</p>;
    if (watcherCount > 2)
      return <p className="online-text">{watcherCount} online</p>;
    return <p className="online-text">online</p>;
  };

  return (
    <div className="header-container">
      <MessagingHeader />
      <div className="online-status">{getWatcherText()}</div>
    </div>
  );
};

export default ChatInner;
