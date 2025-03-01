import GeneratePrompt from "./GeneratePrompt";

export default function Prompt({ modelURL, modelType, mode }: { modelURL: string, modelType: string, mode: "generate" | "chat" }) {
    if (mode === "generate") {
        return <GeneratePrompt modelURL={modelURL} modelType={modelType} />;
    } else {
        return <></>;
    }
}
