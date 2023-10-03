import { ChatMessageType } from "../../../types/chatWidget";
import { MoreHorizontal } from "lucide-react";

const dotStyle = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: '#333',
  margin: '0 2px 10px 3px',
};


export default function ChatMessage({
  message,
  isSend,
  error,
  user_message_style,
  bot_message_style,
  error_message_style,
}: ChatMessageType) {
  return (
    <div
      className={
        "cl-chat-message cl-break-words " + (isSend ? " cl-justify-end" : " cl-justify-start")
      }
    >
      {isSend ? (
        <div style={user_message_style} className="cl-user_message">
          {message}
        </div>
      ) : error ? (
        <div style={error_message_style} className={"cl-error_message"}>
          {message}
        </div>
      ) : (
        <div style={bot_message_style} className={"cl-bot_message"}>
          {message === "" ? (
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
              <div style={{ ...dotStyle, animation: 'verticalRoll 1s ease-in-out infinite' }}></div>
              <div style={{ ...dotStyle, animation: 'verticalRoll 1s ease-in-out 0.2s infinite' }}></div>
              <div style={{ ...dotStyle, animation: 'verticalRoll 1s ease-in-out 0.4s infinite' }}></div>
            </div>
          ) : (
            message
          )}
        </div>
      )}
    </div>
  );
}
