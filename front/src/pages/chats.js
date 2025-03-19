import React, { useContext } from "react";
import ChatsPreview from "../components/chatsPreview";
import ChatContainer from "../components/chatContainer";
import { UserContext } from "../App";
import "../assets/css/chats.css";

function Chats() {
  const { isMobile, activeChat } = useContext(UserContext);

  return (
    <div className="chats-page">
      <div className="chats-wrapper">
        {/* Sidebar for Chat Previews */}
        {!isMobile || !activeChat ? ( // Hide chat list when active chat is open
          <aside
            className="chats-sidebar"
            style={{ width: isMobile ? "100%" : 400 }}
          >
            <ChatsPreview />
          </aside>
        ) : null}

        {/* Main Chat Container (Only show on larger screens OR when a chat is selected on mobile) */}
        {!isMobile || activeChat ? (
          <main className="chats-main">
            <ChatContainer type="messaging" />
          </main>
        ) : null}
      </div>
    </div>
  );
}

export default Chats;
