import { ChatMessage } from "./types";

/**
 * given a prompt, submits a POST request to the Ollama server for a single text generation, and returns a readable stream of the response
 * @param prompt
 * @param modelURL
 * @param modelType
 * @returns
 */
export const submitGeneratePrompt = async (
    prompt: string,
    modelURL: string,
    modelType: string
): Promise<ReadableStreamDefaultReader | undefined> => {
    const requestBody = {
        model: modelType,
        prompt: prompt
    };

    const response = await fetch(`${modelURL}/api/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    return response.body?.getReader();
};

/**
 * given a prompt, submits a POST request to the Ollama server for a chat, and returns a readable stream of the response
 * @param prompt
 * @param messageHistory
 * @param modelURL
 * @param modelType
 * @returns
 */
export const submitChatPrompt = async (
    prompt: string,
    messageHistory: Array<ChatMessage>,
    modelURL: string,
    modelType: string
): Promise<ReadableStreamDefaultReader | undefined> => {
    const requestBody = {
        model: modelType,
        prompt: prompt,
        messages: messageHistory
    };

    const response = await fetch(`${modelURL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    return response.body?.getReader();
};

export const consumeResponse = async (
    reader: ReadableStreamDefaultReader
): Promise<string | null> => {
    const { done, value } = await reader.read();
    return done ? null : new TextDecoder().decode(value);
};
