import React, { useContext } from "react";
import ChatsPreview from "../components/chatsPreview";
import { UserContext } from "../App";
import ChatContainer from "../components/chatContainer";
function Chats() {
  const { isMobile } = useContext(UserContext);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", height: "auto" }}>
        <div style={{ width: isMobile ? 340 : 400 }}>
          <ChatsPreview />
        </div>
        <div style={{ flex: 1, background: "lightblue" }}>
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}

export default Chats;
