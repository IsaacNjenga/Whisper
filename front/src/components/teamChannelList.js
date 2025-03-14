//adding a channel
import React, { useContext } from "react";
import Swal from "sweetalert2";
import UserList from "./userListsTwo";
import ChatContainer from "./chatContainer";
import { UserContext } from "../App";

function TeamChannelList({ children, error = false, loading, type }) {
  const { isCreating, isEditing, setIsCreating, setIsEditing, createType } =
    useContext(UserContext);
  if (error) {
    return type === "messages"
      ? Swal.fire({
          icon: "warning",
          title: "Something went wrong...",
          text: "Please try refreshing the page",
        })
      : null;
  }

  if (loading) {
    return <p> {type === "team" ? "Channels" : "Chats"} loading...</p>;
  }

  return (
    <div>
      TeamChannelList
      <br />
      {type === "team" ? "Channels" : "Recent Messages"}
      {children}
      {/* <UserList /> */}
      Chat Container for messages
      <ChatContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        createType={createType}
      />
    </div>
  );
}

export default TeamChannelList;
