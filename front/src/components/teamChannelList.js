//adding a channel
import React from "react";
import Swal from "sweetalert2";

function TeamChannelList({ children, error = false, loading, type }) {
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
      {type === "team" ? "Channels" : "Recent Chats"}
      {children}
    </div>
  );
}

export default TeamChannelList;
