import { useState, useEffect } from "react";
import { consumeResponse, submitPrompt } from "../lib/ollamaResponse";

export type OllamaHookValues = {
    response: string;
    prompt: string;
    setPrompt: (prompt: string) => void;
    isAwaitingPrompt: boolean;
    setIsAwaitingPrompt: (isAwaitingPrompt: boolean) => void;
};

const callOllama = (modelURL: string, modelType: string): OllamaHookValues => {
    const [isAwaitingPrompt, setIsAwaitingPrompt] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    useEffect(() => {
        const asyncWrapper = async () => {
            const stream = await submitPrompt(prompt, modelURL, modelType);
            if (stream) {
                let responseBuf = "";
                let currChunk = await consumeResponse(stream);
                while (currChunk !== null) {
                    // currChunk is null when the stream is done
                    responseBuf += JSON.parse(currChunk).response;
                    setResponse(responseBuf); // update the response
                    currChunk = await consumeResponse(stream);
                }
                setPrompt(""); // reset on success
            }
            setIsAwaitingPrompt(true); // allow for another submission!
        };

        if (!isAwaitingPrompt) {
            // submit prompt and fetch response once prompt is submitted
            asyncWrapper();
        }
    }, [isAwaitingPrompt]); // triggers on change of isAwaitingPrompt

    return {
        response,
        prompt,
        setPrompt,
        isAwaitingPrompt,
        setIsAwaitingPrompt
    };
};

export default callOllama;
