// VideoChat.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  useCallStateHooks,
  CallingState,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";
import { Modal, Spin, Button } from "antd";
import Cookies from "universal-cookie";
import { UserContext } from "../App";

const cookies = new Cookies();
const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const VideoChat = ({ callId, isVisible, setIsVisible }) => {
  const { authToken } = useContext(UserContext);
  const user = {
    id: cookies.get("userId"),
    name: cookies.get("fullName"),
  };

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const streamClient = new StreamVideoClient({ apiKey, user, token: authToken });
    const streamCall = streamClient.call("default", callId);

    setClient(streamClient);
    setCall(streamCall);

    if (isVisible) {
      streamCall.join({ create: true });
    }

    return () => {
      streamCall.leave();
      streamClient.disconnectUser();
    };
  }, [callId, isVisible, authToken]);

  const MyLayout = () => {
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
      return <Spin style={{ display: "block", margin: "40px auto" }} />;
    }

    return (
      <StreamTheme>
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls />
      </StreamTheme>
    );
  };

  if (!client || !call) return null;

  return (
    <Modal
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={
        <Button danger onClick={() => setIsVisible(false)}>
          End Call
        </Button>
      }
      title="Video Call"
      width="90%"
      style={{ top: 20 }}
    >
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyLayout />
        </StreamCall>
      </StreamVideo>
    </Modal>
  );
};

export default VideoChat;
