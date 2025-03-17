import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const avatarForNow =
  "https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg?auto=compress&cs=tinysrgb&w=400";

const initialValues = {
  // firstName: "",
  // lastName: "",
  // email: "",
  fullName: "",
  password: "",
  username: "",
  avatarUrl: "",
  phoneNumber: "",
};

const inputStyle = {
  background: 0,
  border: "1px solid white",
  height: 40,
  fontSize: 14,
  color: "white",
};
function Auth() {
  const [form] = Form.useForm();
  const [values, setValues] = useState(initialValues);
  const [isSignUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const switchMode = () => {
    setSignUp((prev) => !prev);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { username, avatarUrl, password, phoneNumber } = values;

      const url = "https://whisper-server-xi.vercel.app/whisper";
      //http://localhost:3001/

      const {
        data: { token, userId, hashedPassword, fullName },
      } = await axios.post(`${url}/${isSignUp ? "signup" : "login"}`, {
        username,
        password,
        avatarUrl: avatarForNow,
        fullName: values.fullName,
        phoneNumber,
      });

      cookies.set("token", token);
      cookies.set("username", username);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);

      if (isSignUp) {
        cookies.set("phoneNumber", phoneNumber);
        cookies.set("avatarUrl", avatarUrl);
        cookies.set("hashedPassword", hashedPassword);
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      form.resetFields();
      setValues(initialValues);
    }
  };

  return (
    <>
      <Card
        style={{
          background: "linear-gradient(to left, #350d4b 0%, #e5001a 100%)",
          maxWidth: 600,
          margin: "10px auto",
          padding: 0,
          color: "white",
        }}
      >
        {" "}
        <Divider variant="solid" style={{ borderColor: "#fff" }}>
          <div
            style={{
              margin: "1px auto",
              padding: "1px 10px",
              borderRadius: "15px",
            }}
          >
            <span style={{ color: "#fff", fontSize: 18 }}>
              {isSignUp ? "Create your account" : "Sign In"}
            </span>
          </div>
        </Divider>
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          {isSignUp && (
            <div
              style={{
                display: "grid",
                gap: "5px",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
              }}
            >
              {/* First Name */}
              {/* <Form.Item
                label={
                  <span style={{ color: "#fff", fontSize: 18 }}>
                    First Name
                  </span>
                }
                name="firstName"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input
                  value={values.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  style={inputStyle}
                />
              </Form.Item> */}
              {/* Last Name */}
              {/* <Form.Item
                label={
                  <span style={{ color: "#fff", fontSize: 18 }}>Last Name</span>
                }
                name="lastName"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input
                  value={values.firstName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  style={inputStyle}
                />
              </Form.Item> */}
              {/* Full Name */}
              <Form.Item
                label={
                  <span style={{ color: "#fff", fontSize: 18 }}>Full Name</span>
                }
                name="fullName"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input
                  value={values.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  style={inputStyle}
                />
              </Form.Item>
              {/* Email Address */}
              {/* <Form.Item
                label={
                  <span style={{ color: "#fff", fontSize: 18 }}>
                    Email Address
                  </span>
                }
                name="email"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  style={inputStyle}
                />
              </Form.Item> */}
              {/* Phone Number */}
              <Form.Item
                label={
                  <span style={{ color: "#fff", fontSize: 18 }}>
                    Phone Number (+254)
                  </span>
                }
                name="phoneNumber"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input
                  value={values.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  style={inputStyle}
                />
              </Form.Item>
            </div>
          )}

          {/* Username */}
          <Form.Item
            label={
              <span style={{ color: "#fff", fontSize: 18 }}>Username</span>
            }
            name="username"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input
              value={values.username}
              onChange={(e) => handleChange("username", e.target.value)}
              style={inputStyle}
            />
          </Form.Item>

          {!isSignUp && (
            <Form.Item
              label={
                <span style={{ color: "#fff", fontSize: 18 }}>Password</span>
              }
              name="password"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone style={{ color: "white" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ color: "white" }} />
                  )
                }
                onChange={(e) => handleChange("password", e.target.value)}
                value={values.password}
                style={inputStyle}
              />
            </Form.Item>
          )}

          {isSignUp && (
            <div
              style={{
                display: "grid",
                gap: "5px",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
              }}
            >
              {/* Password */}
              <Form.Item
                label={
                  <span style={{ color: "#fff", fontSize: 18 }}>Password</span>
                }
                name="password"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone style={{ color: "white" }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ color: "white" }} />
                    )
                  }
                  onChange={(e) => handleChange("password", e.target.value)}
                  value={values.password}
                  style={inputStyle}
                />
              </Form.Item>
              {/* Confirm Password */}

              <Form.Item
                label={
                  <span style={{ color: "#fff", fontSize: 18 }}>
                    Re-enter password
                  </span>
                }
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone style={{ color: "white" }} />
                    ) : (
                      <EyeInvisibleOutlined style={{ color: "white" }} />
                    )
                  }
                  style={inputStyle}
                />
              </Form.Item>
            </div>
          )}
          <p style={{ color: "white" }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={switchMode}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </span>
          </p>
          {/* Submission button */}
          <Form.Item style={{ textAlign: "center", marginTop: 10 }}>
            <Button
              loading={loading}
              htmlType="submit"
              type="primary"
              style={{
                background: "#1578ff",
                border: "1px solid white",
                height: 40,
                fontSize: 14,
                fontWeight: "bold",
                width: "55%",
              }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Auth;
