import "./App.css";

import { useState } from "react";

import { FormControlLabel, Switch } from "@mui/material";

import Prompt from "./components/Prompt";

export default function App() {
    const modelURL = "http://localhost:11434";
    const modelType = "llama3.2:1b";

    const [mode, setMode] = useState<"generate" | "chat">("generate");

    const toggleMode = () => {
        setMode(mode === "generate" ? "chat" : "generate");
    };

    return (
        <>
            <h1>Ollama</h1>
            <div>
                <FormControlLabel control={<Switch checked={mode === "chat"} onChange={toggleMode} />} label="Chat Mode"/>
            </div>
            <Prompt modelURL={modelURL} modelType={modelType} mode={mode} />
        </>
    )
}
