import React, { useState, useContext, useEffect } from "react";
import { Avatar, Tag, List, Alert, Empty } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { UserContext } from "../App";
import { useChatContext } from "stream-chat-react";

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
  
      console.log("Selected Users (IDs only):", updatedSelection);
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
        dataSource={users}
        renderItem={(user) => {
          const isSelected = selectedUsers.some((u) => u.id === user.id);
          return (
            <List.Item
              onClick={() => toggleUserSelection(user)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.image ? user.image : null} />}
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
