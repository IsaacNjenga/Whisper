import React, { useState } from "react";
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
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

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

  const getWatcherText = (watchers) => {
    if (!watchers) return <p style={{ color: "grey" }}>Offline</p>;
    if (watchers === 1) return <p style={{ color: "grey" }}>Offline</p>;
    if (watcher_count > 2)
      return <p style={{ color: "green" }}>{watcher_count} online</p>;
    return <p style={{ color: "green" }}>Online</p>;
  };

  return (
    <div className="header-container">
      <MessagingHeader />
      <div className="online-status">
        <p className="status-text">{getWatcherText(watcher_count)}</p>
      </div>
    </div>
  );
};

export default ChatInner;
