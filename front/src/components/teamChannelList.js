//adding a channel
import React from "react";
import Swal from "sweetalert2";
import { AddChannel } from "./addChannel";

function TeamChannelList({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) {
  if (error) {
    return type === "team"
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
      <AddChannel
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        type={type === "team" ? "team" : "messaging"}
      />
      {children}
    </div>
  );
}

export default TeamChannelList;
