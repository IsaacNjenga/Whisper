import { useEffect } from "react";
import { useChatContext } from "stream-chat-react";

function IncomingCallListener({ onIncomingCall }) {
  const { channel } = useChatContext();

  useEffect(() => {
    const handleNewMessage = (event) => {
      const message = event.message;
      if (message.type === "video-call" && message.callId) {
        onIncomingCall({
          callId: message.callId,
          from: message.user,
        });
      }
    };

    channel.on("message.new", handleNewMessage);

    return () => {
      channel.off("message.new", handleNewMessage);
    };
  }, [channel, onIncomingCall]);

  return null; 
}
