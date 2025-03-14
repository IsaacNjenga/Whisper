import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export const AddChannel = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
  type,
}) => (
  <Button
    onClick={() => {
      setCreateType(type);
      setIsCreating((prevState) => !prevState);
      setIsEditing(false);
    }}
  >
    <UserAddOutlined />
  </Button>
);
