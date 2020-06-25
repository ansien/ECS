interface ChatMessage {
    sender: string;
    message: string;
    channel: 'en' | 'ru';
}

interface MessageDefinition {
    ServerMessages: {
        history: ChatMessage[];
    };
    // messages clients can send to the server, with a typed response
    ClientRPCs: {
        postMessage: {
            request: { message: string; channel: 'en' | 'ru' };
            response: "ok";
            error: string;
        };
    };
    // messages clients can send to the server (without a response)
    ClientMessages: {
        chatMessage: ChatMessage;
    };
}

export type TypedChatClient = ClientSideSocket<MyServerDefinition, "/chat">;

const sendMessage = <T>(id: number | string, data: T): void => {

}