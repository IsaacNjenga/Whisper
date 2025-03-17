import React, { useState, useContext, useEffect } from "react";
import { Tag, List, Alert, Empty, Card, Avatar } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserContext } from "../App";
import { useChatContext } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const UsersList = ({ selectedUsers, setSelectedUsers }) => {
  const { client } = useChatContext();
  const { isMobile } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) => {
      const updatedSelection = prev.some((u) => u === user.id)
        ? prev.filter((u) => u !== user.id)
        : [...prev, user.id]; // Store only user IDs

      return updatedSelection;
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
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
  }, []);

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

  if (loading) return <Alert message="Loading" showIcon />;

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
      {selectedUsers?.length > 0 && (
        <div className="selected-users">
          {selectedUsers.map((user) => (
            <Tag
              key={user.id}
              closable
              onClose={() => toggleUserSelection(user)}
              icon={<CloseCircleOutlined />}
              color="blue"
              className="user-tag"
            >
              {user.name}
            </Tag>
          ))}
        </div>
      )}

      {/* Users List */}
      <List
        header={<div className="user-list-header">Available Users</div>}
        dataSource={users}
        renderItem={(user) => {
          const isSelected = selectedUsers.some((u) => u.id === user.id);
          return (
            <List.Item
              onClick={() => toggleUserSelection(user)}
              className={`user-list-item ${isSelected ? "selected" : ""}`}
            >
              <Avatar
                image={user.image}
                icon={<UserOutlined />}
                size={32}
                className="direct-avatar"
                style={{
                  marginRight: "5px",
                }}
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
