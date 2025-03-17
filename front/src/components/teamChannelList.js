import React from "react";
import { Spin, Alert } from "antd"; // Importing Ant Design components for loading and error handling
import "../assets/css/teamChannelList.css"; // Assuming you have a CSS file for styles

function TeamChannelList({ children, error = false, loading, type }) {
  return (
    <div className="team-channel-list">
      {error && (
        <Alert
          message="Error"
          description="Something went wrong. Please try refreshing the page."
          type="error"
          showIcon
          className="error-alert"
        />
      )}

      {loading && (
        <div className="loading-container">
          <Spin size="large" />
          <p>{type === "team" ? "Loading Channels..." : "Loading Chats..."}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="channel-list-content">
          {/* {type === "team" ? <h2>Channels</h2> : ""} */}
          {children}
        </div>
      )}
    </div>
  );
}

export default TeamChannelList;
