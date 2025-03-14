import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import { Button, Divider, Form, Input } from "antd";
import UsersList from "./usersList";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const [form] = Form.useForm();

  const handleChange = (name, value) => {
    setChannelName((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form layout="vertical" form={form}>
      <Form.Item label="Channel Name" name="channelName">
        <Input
          onChange={(e) => handleChange("channelName", e.target.value)}
          value={channelName}
        />
      </Form.Item>
      <Divider />
    </Form>
  );
};

function CreateChannel() {
  const { createType, setIsCreating } = useContext(UserContext);
  //const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);

  const createChannel = async () => {
    setLoading(true);
    try {
      // const newChannel = await client.channel(createType, channelName, {
      //     name: channelName,
      //     members: selectedUsers,
      //   });
      //   await newChannel.watch();
      console.log(channelName);
      console.log("selectedUsers",selectedUsers)
      setChannelName("");
      setIsCreating(false);
      //   setSelectedUsers([client.userID]);
      //   setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "Something went wrong",
        text: "Please refresh and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UsersList
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
      <Button
        type="primary"
        onClick={createChannel}
        disabled={selectedUsers.length === 0 ? true : false}
        style={{ margin: "10px 0px" }}
      >
        {createType ? "Create Channel" : "Message"}
      </Button>
    </div>
  );
}

export default CreateChannel;
