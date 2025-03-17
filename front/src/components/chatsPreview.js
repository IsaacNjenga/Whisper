import React, { useContext } from "react";
import { UserContext } from "../App";
import { ChannelList, useChatContext } from "stream-chat-react";
import TeamChannelList from "./teamChannelList";
import TeamChannelPreview from "./teamChannelPreview";
import { Tabs } from "antd";
import {
  ClockCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CreateChannel from "./createChannel";
import "../assets/css/chatsPreview.css";
import ChatSearch from "./chatSearch";

const customChatMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const RecentList = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  const { client } = useChatContext();
  const filters = { members: { $in: [client.userID] } };

  return (
    <ChannelList
      filters={filters}
      channelRenderFilterFn={customChatMessagingFilter}
      List={(listProps) => (
        <TeamChannelList
          {...listProps}
          type="messaging"
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      )}
      Preview={(previewProps) => (
        <TeamChannelPreview
          {...previewProps}
          type="messaging"
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      )}
    />
  );
};

const ChatsPreview = () => {
  const { isCreating, setIsCreating, setCreateType, setIsEditing } =
    useContext(UserContext);

  const tabItems = [
    {
      label: "New",
      key: "1",
      children: (
        <CreateChannel
          createType={() => {
            setCreateType("messaging");
          }}
        />
      ),
      icon: <PlusCircleOutlined />,
    },
    {
      label: "Chats",
      key: "2",
      children: (
        <RecentList
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      ),
      icon: <ClockCircleOutlined />,
    },
    {
      label: "Search",
      key: 3,
      children: <ChatSearch />,
      icon: <SearchOutlined />,
    },
  ];

  return (
    <div className="chats-preview-container">
      <Tabs defaultActiveKey="2" className="chats-tabs" items={tabItems} />
    </div>
  );
};

export default ChatsPreview;
