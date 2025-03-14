import React, { useState } from "react";
import { Button, Modal } from "antd";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Logout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Remove cookies
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarUrl");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    // Reload the page
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" danger onClick={showModal}>
        Logout
      </Button>
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
}

export default Logout;
