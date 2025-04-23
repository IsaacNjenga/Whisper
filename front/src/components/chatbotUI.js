import { useEffect, useRef } from "react";
import { Card, Input, Button, Typography, Space, Spin } from "antd";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import "../assets/css/chatbotUI.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const { Text } = Typography;

const renderMessageContent = (msg) => {
  return (
    <ReactMarkdown
      children={msg.content}
      components={{
        code({ node, inline, className, children, ...props }) {
          return !inline ? (
            <SyntaxHighlighter
              style={oneDark}
              language="javascript" // Or detect dynamically
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code style={{ backgroundColor: "#eee", padding: "2px 4px" }}>
              {children}
            </code>
          );
        },
        ol: ({ children }) => <ol style={{ paddingLeft: 20 }}>{children}</ol>,
        ul: ({ children }) => <ul style={{ paddingLeft: 20 }}>{children}</ul>,
      }}
    />
  );
};

const ChatbotUI = ({
  messages,
  input,
  setInput,
  sendMessage,
  loading,
  setOpenBot,
}) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Card
      title="WhisperBot"
      extra={<CloseOutlined onClick={() => setOpenBot(false)} />}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        bottom: 100,
        right: 24,
        width: 320,
        zIndex: 1001,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#fff",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "6px",
              background: "#fff",
            }}
          >
            <div
              style={{
                backgroundColor:
                  msg.role === "user" ? "#1678ff" : "rgba(0, 140, 0, 0.5)",
                color: "white",
                padding: "1px 7px",
                borderRadius: "8px",
                maxWidth: "60%",
                wordBreak: "break-word",
              }}
            >
              <>
                <div>
                  <Text strong>
                    {msg.role === "user" ? "You" : "WhisperBot"}:
                  </Text>
                  {renderMessageContent(msg)}
                </div>
              </>
            </div>
          </div>
        ))}{" "}
        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "40px auto" }}
          />
        ) : null}
        <div ref={chatEndRef} />{" "}
        <Space.Compact style={{ width: "100%" }}>
          <Input
            className="custom-chat-input"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={sendMessage}
            disabled={loading}
          />
          <Button
            icon={<SendOutlined />}
            type="primary"
            onClick={sendMessage}
            disabled={loading}
            style={{ padding: "10px 25px" }}
          />
        </Space.Compact>
      </div>
    </Card>
  );
};

export default ChatbotUI;
