import { useState, useEffect } from "react";
import { consumeResponse, submitGeneratePrompt, submitChatPrompt } from "../lib/ollamaResponse";
import { ChatMessage, Mode, OllamaHookValues } from "../lib/types";

const callOllama = (modelURL: string, modelType: string, mode: Mode): OllamaHookValues => {
    const [isAwaitingPrompt, setIsAwaitingPrompt] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [messageHistory, setMessageHistory] = useState<Array<ChatMessage>>([]);

    useEffect(() => {
        const asyncWrapperGenerate = async () => {
            const stream = await submitGeneratePrompt(prompt, modelURL, modelType);
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

        const asyncWrapperChat = async () => {
            const stream = await submitChatPrompt(prompt, messageHistory, modelURL, modelType);
            if (stream) {
                let responseBuf = "";
                let currChunk = await consumeResponse(stream);
                while (currChunk !== null) {
                    // currChunk is null when the stream is done
                    responseBuf += JSON.parse(currChunk).response;
                    currChunk = await consumeResponse(stream);
                }
                setMessageHistory([...messageHistory, { role: "user", content: prompt }, { role: "assistant", content: responseBuf }]); // update chat once response is done
                setPrompt(""); // reset on success
            }
        };

        if (!isAwaitingPrompt) {
            // submit prompt and fetch response once prompt is submitted
            if (mode === "generate") {
                asyncWrapperGenerate();
            } else {
                asyncWrapperChat();
            }
        }
    }, [isAwaitingPrompt]); // triggers on change of isAwaitingPrompt

    if (mode === "generate") {
        return {
            response,
            prompt,
            setPrompt,
            isAwaitingPrompt,
            setIsAwaitingPrompt
        };
    } else { // mode === "chat", return different values
        return {
            prompt,
            setPrompt,
            isAwaitingPrompt,
            setIsAwaitingPrompt,
            messageHistory
        }
    }

    
};

export default callOllama;
