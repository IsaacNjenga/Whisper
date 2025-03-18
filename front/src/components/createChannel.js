import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import { Alert, Button, Divider, Form, Input } from "antd";
import UsersList from "./usersList";
import { useChatContext } from "stream-chat-react";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const [form] = Form.useForm();

  // const handleChange = (name, value) => {
  //   setChannelName((prev) => ({ ...prev, [name]: value }));
  // };

  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        label="Channel Name"
        name="channelName"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Input
          onChange={(e) => setChannelName(e.target.value)}
          value={channelName}
        />
      </Form.Item>
      <Divider />
    </Form>
  );
};

function CreateChannel({ createType }) {
  const { client, setActiveChannel } = useChatContext();
  const { setIsCreating } = useContext(UserContext);
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);

  const createChannel = async () => {
    setLoading(true);
    try {
      if (!createType || typeof createType !== "string") {
        throw new Error("Invalid channel type");
      }

      const finalChannelName =
        createType === "messaging"
          ? selectedUsers.find((id) => id !== client.userID) || "private-chat"
          : channelName;

      console.log("finalChannelName", finalChannelName);

      if (!finalChannelName || typeof finalChannelName !== "string") {
        throw new Error("Invalid channel name");
      }

      const newChannel = await client.channel(createType, finalChannelName, {
        name: finalChannelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.error("Error creating channel:", error);
      Swal.fire({
        icon: "warning",
        title: "Something went wrong",
        text: error.message || "Please refresh and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <Alert message="Loading" showIcon />;
  }

  return (
    <div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UsersList
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
      <Button
        type="primary"
        onClick={createChannel}
        disabled={selectedUsers.length === 0 ? true : false}
        style={{
          margin: "10px 0px",
        }}
      >
        {createType === "team" ? "Create Channel" : "Message"}
      </Button>
    </div>
  );
}

export default CreateChannel;
