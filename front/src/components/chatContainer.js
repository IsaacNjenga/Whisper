//this page shows the received and sent messages
import React from "react";
import { Channel, MessageSimple } from "stream-chat-react";
import ChatInner from "./chatInner.js";

function ChatContainer({
  isCreating,
  isEditing,
  setIsCreating,
  setIsEditing,
  createType,
}) {
  if (isCreating) {
    return <div>creating channel</div>;
  }

  if (isEditing) {
    return <div>editing channel</div>;
  }

  const EmptyState = () => {
    return (
      <div>
        <p>Send messages</p>
      </div>
    );
  };

  return (
    <>
      <div>
        <Channel
          EmptyStateIndicator={EmptyState}
          Message={(messageProps, i) => (
            <MessageSimple key={i} {...messageProps} />
          )}
        >
          <ChatInner />
        </Channel>
      </div>
    </>
  );
}

export default ChatContainer;
