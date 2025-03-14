import { Divider } from "antd";
import React from "react";
import { Avatar } from "stream-chat-react";

function ChannelsPreview() {
  const randomImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeWKMZijQi3VjI-waHYuO2OJnvWFFefcS1lw&s";

  const channels = [
    { name: "Group 1" },
    { name: "Group 2" },
    { name: "Group 3" },
  ];
  const ChannelView = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {channels.map((channel) => (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0px 10px",
              cursor: "pointer",
            }}
          >
            {" "}
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                overflow: "hidden",
                objectFit: "cover",
                background: "black",
              }}
            >
              <Avatar image={randomImage} size={40} />
            </div>
            <p
              style={{
                marginLeft: "10px",
                fontSize: "1rem",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {channel.name}
            </p>
          </div>
          {<Divider />}
        </>
      ))}
    </div>
  );

  return <ChannelView />;
}

export default ChannelsPreview;
