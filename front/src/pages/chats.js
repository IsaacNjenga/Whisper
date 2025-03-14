import React, { useContext } from "react";
import ChatsPreview from "../components/chatsPreview";
import { Button, Drawer, FloatButton, Space } from "antd";
import { UserContext } from "../App";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateChannel from "../components/createChannel";

function Chats() {
  const {
    setCreateType,
    setIsCreating,
    isMobile,
    closeDrawer,
    showDrawer,
    openDrawer,
  } = useContext(UserContext);
  return (
    <div>
      <FloatButton
        tooltip="Start a new conversation"
        icon={<PlusCircleOutlined />}
        type="primary"
        style={{ insetInlineEnd: 24 }}
        onClick={() => {
          showDrawer();
          setCreateType("messaging");
          setIsCreating(true);
        }}
      />
      <ChatsPreview />{" "}
      <Drawer
        title="Start a new conversation"
        width={isMobile ? 350 : 600}
        onClose={() => {
          closeDrawer();
          setIsCreating(false);
          setCreateType("");
        }}
        open={openDrawer}
        styles={{ body: { paddingBottom: 60 } }}
        extra={
          <Space>
            <Button
              onClick={closeDrawer}
              type="primary"
              style={{ background: "red" }}
            >
              Cancel
            </Button>
          </Space>
        }
      >
        <CreateChannel />
      </Drawer>
    </div>
  );
}

export default Chats;
