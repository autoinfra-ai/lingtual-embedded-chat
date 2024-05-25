// import axios from "axios";

// export async function sendMessage(baseUrl: string, flowId: string, api_key: string, message: string, inputs: any, input_field:string, tweaks?: Object,) {
//     let data;
//     inputs[input_field] = message;
//     if (tweaks) {
//         data = { inputs: inputs, tweaks: tweaks };
//     }
//     else {
//         data = { inputs: inputs };
//     }
//     // let response = await axios.post(`${baseUrl}/api/v1/process/${flowId}`, data, {headers:{"Content-Type": "application/json", "x-api-key": api_key}});
//     let response = await axios.post(`${baseUrl}/api/v1/process/${flowId}`, data, {headers:{"Content-Type": "application/json", "x-api-key": api_key}});
//     return response;
// }

import axios from "axios";

export function sendMessage(baseUrl: string, flowId: string, api_key: string, message: string, inputs: any, input_field: string, tweaks?: Object): WebSocket {
    let data: { inputs: any, tweaks?: Object };
    inputs[input_field] = message;
    if (tweaks) {
        data = { inputs: inputs, tweaks: tweaks };
    } else {
        data = { inputs: inputs };
    }

const protocol = baseUrl.includes('localhost') ? 'ws' : 'wss';
const ws = new WebSocket(`${protocol}://${baseUrl}/ws/${api_key}?character_id=${flowId}&platform=hotel_website&disable_tts=true`);
console.log('WebSocket connection created, URL: ', `${protocol}://${baseUrl}/ws/${api_key}?character_id=${flowId}&platform=hotel_website&disable_tts=true`);
ws.onopen = () => {
        // Send only the message text instead of the entire data object
        ws.send(message);
    };
    ws.onmessage = (event) => {
        console.log('Message from server ', event.data);
    };
    ws.onerror = (error) => {
        console.error('WebSocket error: ', error);
    };
    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };
    return ws;
}