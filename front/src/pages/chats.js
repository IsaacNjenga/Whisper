import React, { useContext } from "react";
import ChatsPreview from "../components/chatsPreview";
import ChatContainer from "../components/chatContainer";
import { UserContext } from "../App";
import "../assets/css/chats.css";

function Chats() {
  const { isMobile } = useContext(UserContext);

  return (
    <div className="chats-page">
      <div className="chats-wrapper">
        {/* Sidebar for Chat Previews */}
        <aside
          className="chats-sidebar"
          style={{ width: isMobile ? 340 : 400 }}
        >
          <ChatsPreview />
        </aside>

        {/* Main Chat Container */}
        <main className="chats-main">
          <ChatContainer type="messaging" />
        </main>
      </div>
    </div>
  );
}

export default Chats;
