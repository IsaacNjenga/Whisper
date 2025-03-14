import React, { useEffect, useState } from "react";
import { Channel, useChatContext, MessageSimple } from "stream-chat-react";
import ChatInner from "./chatInner";
import EditChannel from "./editChannel";

function ChannelContainer({ isEditing, setIsEditing }) {
  const { channel, setActiveChannel } = useChatContext();
  const [forceUpdate, setForceUpdate] = useState(false);
 useEffect(() => {
    if (channel) setForceUpdate((prev) => !prev);
  }, [channel]);
  if (isEditing) {
    return (
      <div>
        <EditChannel />
      </div>
    );
  }

 

  if (!channel || !channel.id) {
    return (
      <div style={{ padding: "10px" }}>Select a chat to start messaging</div>
    );
  }

  const EmptyState = () => {
    return (
      <div>
        <p>This is the beginning of your chat history</p>
        <p>Send messages, attachments and more</p>
      </div>
    );
  };
  return (
    <div>
      chat here
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => (
          <MessageSimple key={i} {...messageProps} />
        )}
      >
        <ChatInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
}

export default ChannelContainer;
