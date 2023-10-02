

to purge jsdelivr cache: click this
https://www.jsdelivr.com/tools/purge and enter https://cdn.jsdelivr.net/gh/autoinfra-ai/lingtual-embedded-chat@latest/dist/build/static/js/bundle.min.js

## What is Lingtual?

Lingtual is a no-code open-source project that empowers developers to build cutting-edge applications using Language Model technologies. With Lingtual, you can leverage the power of LLMs (Large Language Models) to enhance user interactions, generate human-like text, and gain valuable insights from natural language data.

## Features

🌟 Seamless Integration: Easily integrate the Lingtual Widget into your website or web application with just a few lines of JavaScript.

🚀 Interactive Chat Interface: Engage your users with a user-friendly chat interface, powered by Lingtual's advanced language understanding capabilities.

🎛️ Customizable Styling: Customize the appearance of the chat widget to match your application's design and branding.

🌐 Multilingual Support: Communicate with users in multiple languages, opening up your application to a global audience.
<img width="680" alt="Screenshot 2023-09-18 at 7 17 46 PM" src="https://github.com/autoinfra-ai/lingtual-embedded-chat/assets/26863466/8ab24779-8881-40b5-ba87-7e51946d63c5">


## Usage

### on simple HTML
```html
<html lang="en">
<head>
<script src="https://cdn.jsdelivr.net/gh/autoinfra-ai/lingtual-embedded-chat@main/dist/build/static/js/bundle.min.js"></script>
</head>
<body>
<lingtual-chat
    chat_input_field="input"
    chat_inputs='{"input":""}'
    host_url="lingtual url"
    flow_id="your_flow_id"
  ></lingtual-chat>
</body>
</html>
```

### on React
 Import the js bundle in the index.html of your react project
```html
<script src="https://cdn.jsdelivr.net/gh/autoinfra-ai/lingtual-embedded-chat@main/dist/build/static/js/bundle.min.js"></script>
```
Encapsulate your custom element in a react component
```html
export default function ChatWidget() {
  return (
    <div>
<lingtual-chat
    chat_input_field="input"
    chat_inputs='{"input":""}'
    host_url="lingtual url"
    flow_id="your_flow_id"></lingtual-chat>
    </div>
  );
}
```

## Configuration

Use the widget API to customize your widget:

| Prop                  | Type      | Required |
|-----------------------|-----------|----------|
| bot_message_style     | json      | No       |
| chat_input_field      | string    | Yes      |
| chat_inputs           | json      | Yes      |
| chat_position         | string    | No       |
| chat_trigger_style    | json      | No       |
| chat_window_style     | json      | No       |
| chat_output_key       | string    | No       |
| error_message_style   | json      | No       |
| flow_id               | string    | Yes      |
| height                | number    | No       |
| host_url              | string    | Yes      |
| input_container_style | json      | No       |
| input_style           | json      | No       |
| online                | boolean   | No       |
| online_message        | string    | No       |
| placeholder           | string    | No       |
| placeholder_sending   | string    | No       |
| send_button_style     | json      | No       |
| send_icon_style       | json      | No       |
| tweaks                | json      | No       |
| user_message_style    | json      | No       |
| width                 | number    | No       |
| window_title          | string    | No       |

- **bot_message_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for formatting bot messages in the chat window.

- **chat_input_field:**
  - Type: String
  - Required: Yes
  - Description: Specifies the input field type for chat messages.

- **chat_inputs:**
  - Type: JSON
  - Required: Yes
  - Description: Defines the chat input elements and their values.
 
- **chat_output_key:**
  - Type: String
  - Required: No
  - Description: Specify which output to choose if there is more than one output.

- **chat_position:**
  - Type: String
  - Required: No
  - Description: Determines the position of the chat window (top-left, top-center, top-right, center-left, center-right, bottom-right, bottom-center, bottom-left).

- **chat_trigger_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for the chat trigger.

- **chat_window_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for the overall chat window.

- **error_message_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for error messages in the chat window.

- **flow_id:**
  - Type: String
  - Required: Yes
  - Description: Identifier for the flow associated with the component.

- **height:**
  - Type: Number
  - Required: No
  - Description: Specifies the height of the chat window in pixels.

- **host_url:**
  - Type: String
  - Required: Yes
  - Description: The URL of the host for communication with the chat component.

- **input_container_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for the input container where chat messages are typed.

- **input_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for the chat input field.

- **Online:**
  - Type: Boolean
  - Required: No
  - Description: Indicates if the chat component is online or offline.

- **online_message:**
  - Type: String
  - Required: No
  - Description: Custom message to display when the chat component is online.

- **placeholder:**
  - Type: String
  - Required: No
  - Description: Placeholder text for the chat input field.

- **placeholder_sending:**
  - Type: String
  - Required: No
  - Description: Placeholder text to display while a message is being sent.

- **send_button_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for the send button in the chat window.

- **send_icon_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for the send icon in the chat window.

- **tweaks:**
  - Type: JSON
  - Required: No
  - Description: Additional custom tweaks for the associated flow.

- **user_message_style:**
  - Type: JSON
  - Required: No
  - Description: Styling options for formatting user messages in the chat window.

- **width:**
  - Type: Number
  - Required: No
  - Description: Specifies the width of the chat window in pixels.

- **window_title:**
  - Type: String
  - Required: No
  - Description: Title for the chat window, displayed in the header or title bar.
## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](https://github.com/autoinfra-ai/lingtual-embedded-chat/tree/main/LICENSE) file for details.

This is a fork of https://github.com/logspace-ai/langflow-embedded-chat credit to them and flowise for building these similar chat components with MIT! 

https://github.com/FlowiseAI/FlowiseChatEmbed
