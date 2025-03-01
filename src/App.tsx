import "./App.css";

import { TextField } from "@mui/material";
import callOllama from "./hooks/callOllama";

function App() {
    const modelURL = "http://localhost:11434";
    const modelType = "llama3.2:1b";

    const {
        response,
        prompt,
        setPrompt,
        isAwaitingPrompt,
        setIsAwaitingPrompt
    } = callOllama(modelURL, modelType);

    return (
        <>
            <h1>Ollama</h1>
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
        </>
    );
}

export default App;
