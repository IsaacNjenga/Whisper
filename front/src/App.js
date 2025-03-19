import React, { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Channels from "./pages/channels";
import Chats from "./pages/chats";
import Auth from "./pages/auth";
import Navbar from "./components/navbar";
import { Chat } from "stream-chat-react";
import Logout from "./pages/logout";

export const UserContext = createContext();

const apiKey = process.env.REACT_APP_STREAM_API_KEY;
const client = StreamChat.getInstance(apiKey);

const cookies = new Cookies();
const authToken = cookies.get("token");

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarUrl"),
      token: cookies.get("token"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const showDrawer = () => setOpenDrawer(true);
  const closeDrawer = () => setOpenDrawer(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!authToken) {
    return <Auth />;
  }

  return (
    <>
      <UserContext.Provider
        value={{
          isMobile,
          setIsMobile,
          createType,
          setCreateType,
          isCreating,
          setIsCreating,
          isEditing,
          setIsEditing,
          openDrawer,
          setOpenDrawer,
          showDrawer,
          closeDrawer,
          authToken,
          activeChat,
          setActiveChat,
        }}
      >
        <Chat client={client} theme="team light">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<Chats />} />
                <Route path="chats" element={<Chats />} />
                <Route path="channels" element={<Channels />} />
                <Route path="auth" element={<Auth />} />
                <Route path="logout" element={<Logout />} />
              </Route>
            </Routes>
          </BrowserRouter>{" "}
        </Chat>
      </UserContext.Provider>
    </>
  );
}

export default App;
