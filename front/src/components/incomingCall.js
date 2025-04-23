import { useEffect } from "react";
import { useChatContext } from "stream-chat-react";

function IncomingCallListener({ onIncomingCall }) {
  const { channel } = useChatContext();

  useEffect(() => {
    const handleNewMessage = (event) => {
      const message = event.message;
      if (
        message?.custom_type === "video-call" &&
        (message?.callId || message?.custom_data?.callId)
      ) {
        const callId = message.callId || message.custom_data.callId;
        onIncomingCall({ callId, from: message.user });
      }
    };

    channel?.on("message.new", handleNewMessage);
    return () => channel?.off("message.new", handleNewMessage);
  }, [channel, onIncomingCall]);

  return null;
}

export default IncomingCallListener;
