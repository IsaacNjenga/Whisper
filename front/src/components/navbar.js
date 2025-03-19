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
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const { Header, Content, Footer } = Layout;
const cookies = new Cookies();

function Navbar() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const { isMobile, authToken, activeChat } = useContext(UserContext);

  const logout = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("username");
        cookies.remove("fullName");
        cookies.remove("avatarUrl");
        cookies.remove("hashedPassword");
        cookies.remove("phoneNumber");

        window.location.reload();
      }
    });
  };

  const navItems = [
    { key: 1, label: "Chats", icon: CommentOutlined, path: "/chats" },
    { key: 2, label: "Channels", icon: TeamOutlined, path: "/channels" },
    {
      key: 3,
      label: authToken ? "Logout" : "Login",
      icon: PoweroffOutlined,
      onClick: logout,
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
            background: "linear-gradient(to right, #3c83c6 0%, #e33a48 100%)",
          }}
        >
          {/* Logo and Name Container */}
          <div
            style={{
              display: activeChat ? "none" : "flex",
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
          {/* <div style={{ width: "100%" }}>
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
                  "linear-gradient(to right, #3c83c6 0%, #e33a48 100%)",
                color: "white",
              }}
              items={navItems.map(({ key, icon, label, path, onClick }) => ({
                key: path || key,
                icon: React.createElement(icon, {
                  style: {
                    fontSize: "1.55rem",
                    marginBottom: "-20px",
                    marginTop: "14px",
                  },
                }),
                label: path ? (
                  <Link
                    to={path}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "1rem",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "1rem",
                      }}
                    >
                      {label}
                    </span>
                  </Link>
                ) : (
                  label
                ),
                onClick,
                style: {
                  borderRadius: "15px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px",
                  textAlign: "center",
                  gap: "2px",
                },
              }))}
            ></Menu>
          </div> */}
        </Header>

        {/* Main Content */}
        <Content
          style={{
            padding: "0px 0px",
            // minHeight: "calc(100vh - 64px - 70px)",
          }}
        >
          <Outlet />
        </Content>
        {/* Footer */}
        <Footer style={{ padding: "0px 0px", margin: "0px 0px" }}>
          <div style={{ width: "100%", display: activeChat ? "none" : "flex" }}>
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
                  "linear-gradient(to right, #3c83c6 0%, #e33a48 100%)",
                color: "white",
              }}
              items={navItems.map(({ key, icon, label, path, onClick }) => ({
                key: path || key,
                icon: React.createElement(icon, {
                  style: {
                    fontSize: "1.55rem",
                    marginBottom: "-20px",
                    marginTop: "14px",
                  },
                }),
                label: path ? (
                  <Link
                    to={path}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "1rem",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        textDecoration: "none",
                        fontSize: "1rem",
                      }}
                    >
                      {label}
                    </span>
                  </Link>
                ) : (
                  label
                ),
                onClick,
                style: {
                  borderRadius: "15px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px",
                  textAlign: "center",
                  gap: "2px",
                },
              }))}
            ></Menu>
          </div>
        </Footer>
      </Layout>
    </>
  );
}

export default Navbar;
