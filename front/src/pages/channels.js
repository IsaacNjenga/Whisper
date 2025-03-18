import React, { useContext } from "react";
import ChannelsPreview from "../components/channelsPreview";
import { UserContext } from "../App";
import ChatContainer from "../components/chatContainer";

function Channels() {
  const { isMobile, setIsEditing, isEditing } = useContext(UserContext);

  return (
    <div className="chats-page">
      <div className="chats-wrapper">
        <aside
          className="chats-sidebar"
          style={{ width: isMobile ? 340 : 400 }}
        >
          <ChannelsPreview />
        </aside>
        <main className="chats-main">
          <ChatContainer
            type="team"
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
        </main>
      </div>
    </div>
  );
}

export default Channels;
