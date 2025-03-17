import React, { useContext } from "react";
import { UserContext } from "../App";
import { ChannelList, useChatContext } from "stream-chat-react";
import TeamChannelList from "./teamChannelList";
import TeamChannelPreview from "./teamChannelPreview";
import { Tabs } from "antd";
import { ClockCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import CreateChannel from "./createChannel";
import "../assets/css/chatsPreview.css";

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
      label: (
        <span className="tab-label">
          <PlusCircleOutlined /> New
        </span>
      ),
      key: "1",
      children: (
        <CreateChannel
          createType={() => {
            setCreateType("messaging");
          }}
        />
      ),
    },
    {
      label: (
        <span className="tab-label">
          <ClockCircleOutlined /> Recent Chats
        </span>
      ),
      key: "2",
      children: (
        <RecentList
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      ),
    },
  ];

  return (
    <div className="chats-preview-container">
      <Tabs defaultActiveKey="2" className="chats-tabs" items={tabItems} />
    </div>
  );
};

export default ChatsPreview;
