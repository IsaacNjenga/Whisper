import { Divider } from "antd";
import React from "react";
import { Avatar } from "stream-chat-react";

const pfp =
  "https://randomwordgenerator.com/img/picture-generator/53e4d2464e50a814f1dc8460962e33791c3ad6e04e507440722d72d5954ac1_640.jpg";
  
const chatUsers = [
  { name: "Isaac", image: pfp },
  { name: "Emma", image: pfp },
  { name: "Liam", image: pfp },
  { name: "Olivia", image: pfp },
];

function ChatsPreview() {
  const ChatsView = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {chatUsers.map((user) => (
        <React.Fragment key={user.name}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0px 10px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                overflow: "hidden",
                objectFit: "contain",
              }}
            >
              <Avatar image={user.image} name={user.name} size={40} />
            </div>
            <p
              style={{
                marginLeft: "10px",
                fontSize: "1rem",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {user.name}
            </p>
          </div>
          {<Divider />}
        </React.Fragment>
      ))}
    </div>
  );

  return <ChatsView />;
}

export default ChatsPreview;
