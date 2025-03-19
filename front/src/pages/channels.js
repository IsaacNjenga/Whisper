import React, { useContext } from "react";
import ChannelsPreview from "../components/channelsPreview";
import { UserContext } from "../App";
import ChatContainer from "../components/chatContainer";

function Channels() {
  const { isMobile, setIsEditing, isEditing, activeChat } =
    useContext(UserContext);

  return (
    <div className="chats-page">
      <div className="chats-wrapper">
        {!isMobile || !activeChat ? ( // Hide chat list when active chat is open
          <aside
            className="chats-sidebar"
            style={{ width: isMobile ? "100%" : 400 }}
          >
            <ChannelsPreview />
          </aside>
        ) : null}

        {!isMobile || activeChat ? (
          <main className="chats-main">
            <ChatContainer
              type="team"
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          </main>
        ) : null}
      </div>
    </div>
  );
}

export default Channels;
