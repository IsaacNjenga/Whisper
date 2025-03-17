import React, { useState, useContext } from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  CommentOutlined,
  PoweroffOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import logo from "../assets/icons/chat-icon.png";
import { UserContext } from "../App";

const { Header, Content, Footer } = Layout;

function Navbar() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const { isMobile, authToken } = useContext(UserContext);

  const navItems = [
    { label: "Chats", icon: CommentOutlined, path: "/chats" },
    { label: "Channels", icon: TeamOutlined, path: "/" },
    {
      label: authToken ? "Logout" : "Login",
      icon: PoweroffOutlined,
      path: "/logout",
    },
  ];

  const handleClick = (e) => setCurrent(e.key);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            height: "auto",
            padding: "1px",
            background: "linear-gradient(to left, #350d4b 0%, #e5001a 100%)",
          }}
        >
          {/* Logo and Name Container */}
          <div
            style={{
              display: "flex",
              justifyContent: "left",
            }}
          >
            {isMobile ? (
              <>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "65px", height: "65px", marginRight: "10px" }}
                />
                <h1
                  style={{
                    color: "#f0ecec",
                    margin: 0,
                    fontSize: "2rem",
                    letterSpacing: "1.5px",
                    fontFamily: "'Brush Script MT', cursive",
                  }}
                >
                  Whisper
                </h1>
              </>
            ) : (
              <>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    width: "75px",
                    height: "75px",
                    marginRight: "10px",
                  }}
                />
                <h1
                  style={{
                    color: "#f0ecec",
                    margin: 0,
                    fontSize: "2.5rem",
                    letterSpacing: "1.8px",
                    fontFamily: "'Brush Script MT', cursive",
                    zIndex: 10,
                  }}
                >
                  Whisper
                </h1>
              </>
            )}
          </div>
          {/* Menu Container */}
          <div style={{ width: "100%" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[current]}
              onClick={handleClick}
              style={{
                flex: 1,
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                background:
                  "linear-gradient(to left, #350d4b 0%, #e5001a 100%)",
                color: "white",
              }}
            >
              {navItems.map((item) => (
                <Menu.Item
                  key={item.path}
                  icon={
                    <item.icon
                      style={{
                        fontSize: "1.55rem",
                        marginBottom: "-20px",
                        marginTop: "14px",
                      }}
                    />
                  }
                  style={{
                    borderRadius: "15px",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100px",
                    textAlign: "center",
                    gap: "2px",
                    //flex:1
                  }}
                >
                  <Link
                    to={item.path}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "1rem",
                    }}
                  >
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            padding: "0px 0px",
            minHeight: "calc(100vh - 64px - 70px)",
          }}
        >
          <Outlet />
        </Content>
        {/* Footer */}
        <Footer
          style={{ padding: "0px 0px", margin: "0px 0px", background: "black" }}
        ></Footer>
      </Layout>
    </>
  );
}

export default Navbar;
