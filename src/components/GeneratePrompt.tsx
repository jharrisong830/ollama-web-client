import { TextField } from "@mui/material";
import callOllama from "../hooks/callOllama";

export default function GeneratePrompt({ modelURL, modelType }: { modelURL: string, modelType: string }) {
    const {
        response,
        prompt,
        setPrompt,
        isAwaitingPrompt,
        setIsAwaitingPrompt
    } = callOllama(modelURL, modelType);

    return (
        <div>
            <div className="card">
                <button
                    disabled={!isAwaitingPrompt}
                    onClick={
                        () =>
                            prompt.trim().length !== 0 &&
                            setIsAwaitingPrompt(false) // should trigger the effect to call the ollama api!
                    }
                >
                    Ask
                </button>
            </div>
            <div className="card">
                <TextField
                    disabled={!isAwaitingPrompt}
                    multiline
                    variant="filled"
                    label="Prompt"
                    placeholder="Ask your question here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>

            <div className="card">
                <p>{response}</p>
            </div>
        </div>
    );
}
