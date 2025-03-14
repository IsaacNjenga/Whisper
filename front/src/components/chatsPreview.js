import React, { useContext } from "react";
import { List, Avatar, Card, Divider, Typography } from "antd";
import { UserContext } from "../App";

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
  const { isMobile } = useContext(UserContext);

  return (
    <>
      <div>
        <div>
          <Card title="Recent Chats" style={{ width: isMobile ? 340 : 400 }}>
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
        <div>Blah blah blah blah</div>
      </div>
    </>
  );
};

export default ChatsPreview;
