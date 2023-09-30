import axios from "axios";

export async function sendMessage(baseUrl: string, flowId: string, api_key:string, message: string,inputs: any,input_field:string, tweaks?: Object,) {
    let data;
    inputs[input_field] = message;
    if (tweaks) {
        data = { inputs: inputs, tweaks: tweaks };
    }
    else {
        data = { inputs: inputs };
    }
    let response = axios.post(`${baseUrl}/api/v1/process/${flowId}`, data, {headers:{"Content-Type": "application/json", "x-api-key": api_key}});
    return response;
}
