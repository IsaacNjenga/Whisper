import React, { useState, useContext } from "react";
import { Avatar, Tag, List, Alert, Empty } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { UserContext } from "../App";

const pfp = "https://randomuser.me/api/portraits/lego/2.jpg";

const chatUsers = [
  { id: 1, name: "Isaac", image: pfp },
  { id: 2, name: "Emma", image: pfp },
  { id: 3, name: "Liam", image: pfp },
  { id: 4, name: "Olivia", image: pfp },
];

const UsersList = ({ selectedUsers, setSelectedUsers }) => {
  const { isMobile } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) => {
      if (prev.some((u) => u.id === user.id)) {
        return prev.filter((u) => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  if (error) {
    return (
      <Alert
        message="Error"
        description="Error loading users, please refresh and try again."
        type="error"
        showIcon
      />
    );
  }

  if (listEmpty) {
    return <Empty description="No users found" />;
  }

  return (
    <div
      style={{
        width: isMobile ? 270 : 520,
        padding: 15,
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      {/* Selected Users Tags */}
      {selectedUsers?.length > 0 && (
        <div style={{ marginBottom: 5 }}>
          {selectedUsers?.map((user) => (
            <Tag
              key={user.id}
              closable
              onClose={() => toggleUserSelection(user)}
              icon={<CloseCircleOutlined />}
              color="blue"
            >
              {user.name}
            </Tag>
          ))}
        </div>
      )}

      {/* Users List */}
      <List
        header={<div style={{ fontWeight: "bold" }}>Users</div>}
        dataSource={chatUsers}
        renderItem={(user) => {
          const isSelected = selectedUsers.some((u) => u.id === user.id);
          return (
            <List.Item
              onClick={() => toggleUserSelection(user)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.image} />}
                title={user.name}
              />
              {isSelected ? (
                <MinusCircleOutlined style={{ color: "red" }} />
              ) : (
                <PlusCircleOutlined style={{ color: "green" }} />
              )}
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default UsersList;
