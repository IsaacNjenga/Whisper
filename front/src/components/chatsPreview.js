import React, { useContext } from "react";
import { UserContext } from "../App";
import { ChannelList, useChatContext } from "stream-chat-react";
import TeamChannelList from "./teamChannelList";
import TeamChannelPreview from "./teamChannelPreview";

const customChatMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChatsPreview = () => {
  const { isCreating, setIsCreating, setCreateType, setIsEditing } =
    useContext(UserContext);
  const { client } = useChatContext();
  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      Chats Preview Page
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
    </>
  );
};

export default ChatsPreview;
