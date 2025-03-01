/**
 * given a prompt, submits a POST request to the Ollama server, and returns a readable stream of the response
 * @param prompt
 * @returns
 */
export const submitPrompt = async (
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

export const consumeResponse = async (
    reader: ReadableStreamDefaultReader
): Promise<string | null> => {
    const { done, value } = await reader.read();
    return done ? null : new TextDecoder().decode(value);
};
