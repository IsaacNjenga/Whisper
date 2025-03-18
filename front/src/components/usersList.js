import React, { useState, useEffect } from "react";
import { Tag, List, Alert, Empty, Card, Avatar } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useChatContext } from "stream-chat-react";

const UsersList = ({ selectedUsers, setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 20 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, [client]);

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) => {
      return prev.includes(user.id)
        ? prev.filter((id) => id !== user.id)
        : [...prev, user.id];
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

  if (loading) return <Alert message="Loading..." showIcon />;

  return (
    <Card
      style={{
        width: "100%",
        padding: 5,
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background: "#fff",
      }}
    >
      {/* Selected Users Tags */}
      {selectedUsers.length > 0 && (
        <div className="selected-users">
          {selectedUsers.map((userId) => {
            const user = users.find((u) => u.id === userId);
            return user ? (
              <Tag
                key={user.id}
                closable
                onClose={() => toggleUserSelection(user)}
                icon={<CloseCircleOutlined />}
                color="blue"
                className="user-tag"
              >
                {user.fullName ? user.fullName : "User"}{" "}
              </Tag>
            ) : null;
          })}
        </div>
      )}

      {/* Users List */}
      <List
        header={<div className="user-list-header">Available Users</div>}
        dataSource={users}
        renderItem={(user) => {
          const isSelected = selectedUsers.includes(user.id);
          return (
            <List.Item
              onClick={() => toggleUserSelection(user)}
              className={`user-list-item ${isSelected ? "selected" : ""}`}
              style={{
                cursor: "pointer",
                padding: "10px",
                backgroundColor: isSelected ? "#e6f7ff" : "white",
              }}
            >
              <Avatar
                src={user.image}
                icon={<UserOutlined />}
                size={32}
                className="direct-avatar"
                style={{ marginRight: "10px" }}
              />
              <List.Item.Meta title={user?.fullName || user?.id} />
              {isSelected ? (
                <MinusCircleOutlined style={{ color: "red", fontSize: 18 }} />
              ) : (
                <PlusCircleOutlined style={{ color: "green", fontSize: 18 }} />
              )}
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default UsersList;
