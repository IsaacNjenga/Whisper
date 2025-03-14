//displays chats and channels
import React from "react";
import { ChannelList } from "stream-chat-react";
import TeamChannelList from "./teamChannelList";
import ChatsPreview from "./chatsPreview";

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChatListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  //const filters = { members: { $in: [client.userID] } };
  return (
    <>
      <div>
        {/* Channel Chats */}
        <ChannelList
          filters={{}}
          channelRenderFilterFn={{}}
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
            <ChatsPreview
              {...previewProps}
              type="team"
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />

        <ChannelList
          filters={{}}
          channelRenderFilterFn={{}}
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
            <ChatsPreview
              {...previewProps}
              type="messaging"
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />
      </div>
    </>
  );
};

function ChatListContainer({ setCreateType, setIsCreating, setIsEditing }) {
  return (
    <ChatListContent
      setIsCreating={setIsCreating}
      setCreateType={setCreateType}
      setIsEditing={setIsEditing}
    />
  );
}

export default ChatListContainer;
