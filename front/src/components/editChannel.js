import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import UsersList from "./usersList";
import { Alert, Button, Divider, Form, Input, Card } from "antd";
import Swal from "sweetalert2";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const [form] = Form.useForm();
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

function EditChannel({ setIsEditing }) {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name || "");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (channel) {
      const existingMembers = Object.keys(channel.state.members);
      setSelectedUsers(existingMembers); // Set existing members as selected
    }
  }, [channel]);

  const updateChannel = async () => {
    setLoading(true);
    try {
      const nameChanged =
        channelName !== (channel.data.name || channel.data.id);
      if (nameChanged) {
        await channel.update(
          { name: channelName },
          { text: `Channel name changed to ${channelName}` }
        );
      }

      const existingMembers = Object.keys(channel.state.members);
      const newMembers = selectedUsers.filter((id) => !existingMembers.includes(id));
      const removedMembers = existingMembers.filter((id) => !selectedUsers.includes(id));

      if (newMembers.length) {
        await channel.addMembers(newMembers);
      }
      if (removedMembers.length) {
        await channel.removeMembers(removedMembers);
      }

      setChannelName("");
      setIsEditing(false);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error updating channel:", error);
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
    return <Alert message="Loading..." showIcon />;
  }

  return (
    <Card title="Edit Channel">
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UsersList selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
      <Button type="primary" onClick={updateChannel} style={{ marginTop: "10px" }}>
        Save Changes
      </Button>
    </Card>
  );
}

export default EditChannel;
