import React from "react";
import ChatsPreview from "../components/chatsPreview";
import { FloatButton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

function Chats() {
  return (
    <div>
      <FloatButton
        tooltip="Start a new conversation"
        icon={<PlusCircleOutlined />}
        type="primary"
        style={{ insetInlineEnd: 24 }}
      />
      <ChatsPreview />
    </div>
  );
}

export default Chats;
