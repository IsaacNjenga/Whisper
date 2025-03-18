import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { ChannelList, useChatContext } from "stream-chat-react";
import TeamChannelList from "./teamChannelList";
import TeamChannelPreview from "./teamChannelPreview";
import { Tabs } from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import CreateChannel from "./createChannel";
import "../assets/css/chatsPreview.css";
import ChatSearch from "./chatSearch";

const customChatMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const RecentChannels = ({
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
          type="team"
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      )}
      Preview={(previewProps) => (
        <TeamChannelPreview
          {...previewProps}
          type="team"
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      )}
    />
  );
};
function ChannelsPreview() {
  const { isCreating, setIsCreating, setCreateType, setIsEditing, createType } =
    useContext(UserContext);

  useEffect(() => {
    setCreateType("team");
  }, []);

  const tabItems = [
    {
      label: "New",
      key: "1",
      children: <CreateChannel createType={createType} />,
      icon: <PlusCircleOutlined />,
    },
    {
      label: "Channels",
      key: "2",
      children: (
        <RecentChannels
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      ),
      icon: <TeamOutlined />,
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
}

export default ChannelsPreview;
