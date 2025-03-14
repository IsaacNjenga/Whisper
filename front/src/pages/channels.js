import React, { useContext } from "react";
import ChannelsPreview from "../components/channelsPreview";
import { Button, Drawer, FloatButton, Space } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { UserContext } from "../App";
import CreateChannel from "../components/createChannel";

function Channels() {
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
      {" "}
      <FloatButton
        tooltip="Start a new channel"
        icon={<UsergroupAddOutlined />}
        type="primary"
        style={{ insetInlineEnd: 24 }}
        onClick={() => {
          showDrawer();
          setCreateType("team");
          setIsCreating(true);
        }}
      />
      <ChannelsPreview />
      <Drawer
        title="Create a channel"
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

export default Channels;
