export type ChatMessageType = {
  message: string;
  isSend: boolean;
  error?: boolean;
  isAdmin?: boolean;
  bot_message_style?: React.CSSProperties;
  user_message_style?: React.CSSProperties;
  error_message_style?: React.CSSProperties;
};
  
 export type suggestion = {
    questionId: number,
    text: string,
  }