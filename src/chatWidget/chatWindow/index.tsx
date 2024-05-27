import { MessageSquare, Send } from "lucide-react";
import { getAnimationOrigin, getChatPosition } from "../utils";
import React, { useEffect, useRef, useState } from "react";
import { ChatMessageType, suggestion } from "../../types/chatWidget";
import ChatMessage from "./chatMessage";
import { sendMessage } from "../../controllers";
import { isMobile } from 'react-device-detect';

export default function ChatWindow({
  flowId,
  hostUrl,
  updateLastMessage,
  messages,
  chat_inputs,
  chat_input_field,
  bot_message_style,
  send_icon_style,
  user_message_style,
  chat_window_style,
  error_message_style,
  placeholder_sending,
  send_button_style,
  online = true,
  open,
  online_message = "Ask us anything",
  offline_message = "We're offline now",
  window_title = "Chat",
  api_key,
  placeholder,
  chat_output_key,
  input_style,
  input_container_style,
  addMessage,
  position,
  triggerRef,
  width = 450,
  height = 650,
  tweaks,
  suggested_questions,
}: {
  chat_inputs: Object;
  chat_input_field: string;
  bot_message_style?: React.CSSProperties;
  send_icon_style?: React.CSSProperties;
  user_message_style?: React.CSSProperties;
  chat_window_style?: React.CSSProperties;
  error_message_style?: React.CSSProperties;
  send_button_style?: React.CSSProperties;
  online?: boolean;
  open: boolean;
  online_message?: string;
  placeholder_sending?: string;
  offline_message?: string;
  chat_output_key?: string;
  window_title?: string;
  api_key: string;
  placeholder?: string;
  input_style?: React.CSSProperties;
  input_container_style?: React.CSSProperties;
  tweaks?: { [key: string]: any };
  flowId: string;
  hostUrl: string;
  updateLastMessage: Function;
  messages: ChatMessageType[];
  addMessage: Function;
  position?: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  width?: number;
  height?: number;
  suggested_questions: suggestion[];
}) {
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessage = useRef<HTMLDivElement>(null);
  const [windowPosition, setWindowPosition] = useState({ left: "0", top: "0" });
  useEffect(() => {
    if (triggerRef)
      setMobileResponsiveStyles({ height: isMobile ? `${triggerRef.current!.getBoundingClientRect().top - 5}px` : height, width: isMobile ? 'inital' : width });
      setWindowPosition(
        getChatPosition(
          triggerRef.current!.getBoundingClientRect(),
          width,
          height,
          position
        )
      );
  }, [triggerRef, width, height, position]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [MobileResponsiveStyles,setMobileResponsiveStyles] = useState({ height: isMobile ? '80vh' : height, width: isMobile ? 'inital' : width });
  let MobileChat_window_style = isMobile?{
    left: 0,
    bottom: 0,
    top: 0,
    right: 0
  }:{};
  function handleClick() {
    if (value && value.trim() !== "") {
      addMessage({ message: value, isSend: true });
      setSendingMessage(true);
      setValue("");
      const ws = sendMessage(
        hostUrl,
        flowId,
        api_key,
        value,
        chat_inputs,
        chat_input_field,
        tweaks
      );
  
      let accumulatedMessage = "";
      ws.onmessage = (event) => {
        // Check if the message is a Blob (binary data)
        if (event.data instanceof Blob) {
          // Ignoring binary data as per the requirement
          console.log("Received binary data, which will not be displayed.");
        } else {
          // Handle as plain text
          const messagePart = event.data;
          if (messagePart.includes("[end=")) {
            // Find the end token and cut off everything after it
            const endIndex = messagePart.indexOf("[end=");
            if (endIndex !== -1) {
              accumulatedMessage += messagePart.substring(0, endIndex);
              updateLastMessage({
                message: accumulatedMessage,
                isSend: false,
              });
              setSendingMessage(false);
              setValue(""); // Reset input field
              accumulatedMessage = ""; // Clear accumulated message for next message
            }
          } else {
            accumulatedMessage += messagePart;
            updateLastMessage({
              message: accumulatedMessage,
              isSend: false,
            });
          }
        }
      };
  
      ws.onerror = (event) => {
        const errorEvent = event as ErrorEvent;
        updateLastMessage({
          message: "An error occurred",
          isSend: false,
          error: true,
        });
        console.error(errorEvent);
        setSendingMessage(false);
      };
  
      ws.onclose = () => {
        setSendingMessage(false);
        if (accumulatedMessage.length > 0) {
          updateLastMessage({
            message: accumulatedMessage,
            isSend: false,
          });
          accumulatedMessage = ""; // Clear accumulated message
        }
      };
  
      addMessage({ message: "", isSend: false });
    }
  }
  useEffect(() => {
    if (lastMessage.current)
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!sendingMessage) {
      setValue("");
    }
  }, [sendingMessage]);

  function suggestionHandle(QuestionId: number) {
    setValue(suggested_questions[QuestionId - 1].text);
    setSuggestionClicked(true);
    setShowSuggestions(false);
  }

  useEffect(() => {
    handleClick();
    suggestionClicked && setSuggestionClicked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestionClicked]);

  useEffect(() => {
    if (lastMessage.current)
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  
  return (
    <div
      className={
        "cl-chat-window " +
        getAnimationOrigin(position) +
        (open ? " cl-scale-100" : " cl-scale-0")
      }
      style={{ ...windowPosition, zIndex: 9999, ...MobileChat_window_style, ...(isMobile && { position: 'fixed' })}}
    >
      <div
        style={{ ...chat_window_style,...MobileResponsiveStyles}}
        ref={ref}
        className="cl-window"
      >
        <div className="cl-header">
          <div className="cl-header-title">
            <MessageSquare />
            {window_title}
          </div>
          <div className="cl-header-subtitle">
            {online ? (
              <>
                <div className="cl-online-message"></div>
                {online_message}
              </>
            ) : (
              <>
                <div className="cl-offline-message"></div>
                {offline_message}
              </>
            )}
          </div>
        </div>
        <div className="cl-messages_container">
          {messages.map((message, index) => (
            <ChatMessage
              bot_message_style={bot_message_style}
              user_message_style={user_message_style}
              error_message_style={error_message_style}
              key={index}
              message={message.message}
              isSend={message.isSend}
              error={message.error}
            />
          ))}
          <div ref={lastMessage}></div>
        </div>
        {showSuggestions &&
          messages?.length === 0 &&
          <div className="cl-suggestions_container">
            {suggested_questions.map((suggestion, index) => (
              <button
                className="cl-suggestion"
                onClick={() => suggestionHandle(suggestion.questionId)}
                key={suggestion.questionId}
              >
                {suggestion.text}
              </button>
            ))}
          </div>
        }
        <div className="cl-input_container_wrapper">
          <div style={input_container_style} className="cl-input_container">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleClick();
              }}
              type="text"
              disabled={sendingMessage}
              placeholder={
                sendingMessage
                  ? placeholder_sending || "Thinking..."
                  : placeholder || "Type your message..."
              }
              style={input_style}
              className="cl-input-element"
            />
            <button
              style={send_button_style}
              disabled={sendingMessage}
              className="cl-send-button"
              onClick={handleClick}
            >
              <Send
                style={send_icon_style}
                className={
                  "cl-send-icon " +
                  (!sendingMessage
                    ? "cl-notsending-message"
                    : "cl-sending-message")
                }
              />
            </button>
          </div>
        </div>
        <div className="cl-powered-by">
          Powered by <span className="cl-powered-by-lingtual"><a href="https://innkeeper.ai">innkeeper.ai</a></span>
        </div>
      </div>
    </div>
  );
}
