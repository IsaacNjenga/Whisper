import React, { useContext, useState } from "react";
import { List, Avatar, Card, Divider, Typography, Drawer, Space } from "antd";
import { UserContext } from "../App";
import ChatContainer from "./chatContainer";

const { Text } = Typography;

const pfp =
  "https://randomwordgenerator.com/img/picture-generator/53e4d2464e50a814f1dc8460962e33791c3ad6e04e507440722d72d5954ac1_640.jpg";

const chatUsers = [
  { name: "Isaac", image: pfp, lastMessage: "Hey, how are you?" },
  { name: "Emma", image: pfp, lastMessage: "Let's meet tomorrow!" },
  { name: "Liam", image: pfp, lastMessage: "Got it, thanks!" },
  { name: "Olivia", image: pfp, lastMessage: "See you later!" },
];

const ChatsPreview = () => {
  const [preview, setPreview] = useState({});
  const { isMobile, openDrawer, showDrawer, closeDrawer } =
    useContext(UserContext);

  return (
    <>
      {isMobile ? (
        <div>
          <div style={{ width: isMobile ? 340 : 400 }}>
            <Card title="Recent Chats" style={{ width: "100%" }}>
              <List
                itemLayout="horizontal"
                dataSource={chatUsers}
                renderItem={(user, index) => (
                  <>
                    <List.Item
                      style={{
                        cursor: "pointer",
                        padding: "12px",
                        borderRadius: "6px",
                        transition: "background 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                      onClick={() => {
                        setPreview(user);
                        setTimeout(() => {
                          showDrawer();
                        }, 100);
                      }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={user.image} size={45} />}
                        title={<Text strong>{user.name}</Text>}
                        description={
                          <Text type="secondary">{user.lastMessage}</Text>
                        }
                      />
                    </List.Item>
                    {index !== chatUsers.length - 1 && (
                      <Divider style={{ margin: 0 }} />
                    )}
                  </>
                )}
              />
            </Card>
          </div>
          <Drawer
            title={
              preview?.name ? `${preview.name}` : "Start a new conversation"
            }
            width={isMobile ? 355 : 600}
            onClose={closeDrawer}
            open={openDrawer}
            styles={{ body: { paddingBottom: 60 } }}
            extra={<Space></Space>}
          >
            {preview?.name ? (
              <>
                <ChatContainer preview={preview} />
              </>
            ) : (
              <Text>Select a chat</Text>
            )}
          </Drawer>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", height: "auto" }}>
          {/* RecentChats */}
          <div style={{ width: isMobile ? 340 : 400 }}>
            <Card title="Recent Chats" style={{ width: "100%" }}>
              <List
                itemLayout="horizontal"
                dataSource={chatUsers}
                renderItem={(user, index) => (
                  <>
                    <List.Item
                      style={{
                        cursor: "pointer",
                        padding: "12px",
                        borderRadius: "6px",
                        transition: "background 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                      onClick={() => {
                        setPreview(user);
                      }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={user.image} size={45} />}
                        title={<Text strong>{user.name}</Text>}
                        description={
                          <Text type="secondary">{user.lastMessage}</Text>
                        }
                      />
                    </List.Item>
                    {index !== chatUsers.length - 1 && (
                      <Divider style={{ margin: 0 }} />
                    )}
                  </>
                )}
              />
            </Card>
          </div>
          <div style={{ flex: 1, background: "lightblue" }}>
            <ChatContainer preview={preview} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatsPreview;
