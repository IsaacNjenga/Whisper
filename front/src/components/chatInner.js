import React, { useState, useEffect, useContext } from "react";
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
import {
  ArrowLeftOutlined,
  InfoCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Tooltip, Button } from "antd";
import { formatDistanceToNow } from "date-fns";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import VideoChat from "./videoChat";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from "uuid"; // For unique call IDs

const cookies = new Cookies();

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
  const { isMobile, setActiveChat } = useContext(UserContext);
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
              {isMobile && (
                <Button
                  type="link"
                  onClick={() => setActiveChat(null)}
                  style={{
                    fontSize: "26px",
                    color: "#1890ff",
                  }}
                >
                  <ArrowLeftOutlined />
                </Button>
              )}
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
                  <span>
                    {isOnline
                      ? "Online"
                      : lastActive
                      ? `Last active ${formatDistanceToNow(lastActive, {
                          addSuffix: true,
                        })}`
                      : "Offline"}
                  </span>
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
        {isMobile && (
          <Button
            type="link"
            onClick={() => setActiveChat(null)}
            style={{
              fontSize: "26px",
              color: "#1890ff",
            }}
          >
            <ArrowLeftOutlined />
          </Button>
        )}
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

  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [callId, setCallId] = useState(null);
  const [videoChatProps, setVideoChatProps] = useState({});

  const getShortCallId = (userId1, userId2) => {
    const sorted = [userId1, userId2].sort().join("-");
    const hash = btoa(sorted)
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase();
    return `call-${hash.slice(0, 48)}`;
  };

  // const startCall = () => {
  //   const members = Object.values(channel?.state?.members).filter(
  //     ({ user }) => user.id !== client.userID
  //   );
  //   const userObject = members[0]?.user;
  //   const id = userObject.id;
  //   const currentUserId = cookies.get("userId");

  //   const callId = getShortCallId(currentUserId, id);

  //   setVideoChatProps({
  //     userObject,
  //     callId,
  //     setIsVideoChatVisible,
  //     isVideoChatVisible,
  //   });
  //   setIsVideoChatVisible(true);
  // };

  const handleVideoCall = async () => {
    const newCallId = `call-${uuidv4().slice(0, 58)}`; // Ensure < 64 characters
    const currentUserName = cookies.get("fullName");
    setCallId(newCallId);
    setIsVideoVisible(true);

    try {
      const response = await channel.sendMessage({
        text: `${currentUserName} is calling...`,
        type: "regular",
        custom_type: "video-call",
        callId: newCallId,
      });
      console.log("Video call message sent:", response);
    } catch (err) {
      console.error("Failed to send video call message:", err);
    }
  };

  return (
    <>
      <div className="header-container">
        <MessagingHeader />
        <div className="online-status">
          <div className="video-call-icon" onClick={handleVideoCall}>
            <VideoCameraOutlined />
          </div>
          <div> {getWatcherText()}</div>
        </div>
      </div>
      {isVideoVisible && (
        <VideoChat
          callId={callId}
          isVisible={isVideoVisible}
          setIsVisible={setIsVideoVisible}
        />
      )}
    </>
  );
};

export default ChatInner;
