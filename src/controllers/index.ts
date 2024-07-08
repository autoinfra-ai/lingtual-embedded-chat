
// Define a type for the WebSocket endpoint parameters
type WebSocketParams = {
    session_id: string;
    llm_model?: string;
    language?: string;
    token?: string;
    character_id?: string;
    platform?: string;
    journal_mode?: boolean;
    disable_tts?: boolean;
};

export function sendMessage(baseUrl: string, flowId: string, api_key: string, message: string, inputs: any, input_field: string, tweaks?: Object): WebSocket {
    let data: { inputs: any, tweaks?: Object };
    inputs[input_field] = message;
    if (tweaks) {
        data = { inputs: inputs, tweaks: tweaks };
    } else {
        data = { inputs: inputs };
    }

    const protocol = baseUrl.includes('localhost') ? 'ws' : 'wss';

    // Construct WebSocket URL with available parameters
    const params: WebSocketParams = {
        session_id: api_key,
        character_id: flowId,
        platform: 'hotel_website',
        disable_tts: true,
        // Other parameters can be added here if needed:
        // llm_model: "gpt-4o",
        // language: "en-US",
        // token: null,
        // journal_mode: false,
    };

    const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');

    const wsUrl = `${protocol}://${baseUrl}/ws/${params.session_id}?${queryString}`;
    const ws = new WebSocket(wsUrl);

    console.log('WebSocket connection created, URL: ', wsUrl);

    ws.onopen = () => { ws.send(message); };
    ws.onmessage = (event) => { console.log('Message from server ', event.data); };
    ws.onerror = (error) => { console.error('WebSocket error: ', error); };
    ws.onclose = () => { console.log('WebSocket connection closed'); };
    return ws;
}
