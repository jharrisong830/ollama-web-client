export type Mode = "generate" | "chat";

export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export type OllamaHookValues = {
    response?: string;
    prompt: string;
    setPrompt: (prompt: string) => void;
    isAwaitingPrompt: boolean;
    setIsAwaitingPrompt: (isAwaitingPrompt: boolean) => void;
    messageHistory?: Array<ChatMessage>;
    setMessageHistory?: (chatHistory: Array<ChatMessage>) => void;
};
