import { useEffect, useState } from "react";

export const PlantChat = () => {
    //ai generated
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://api.example.com/chat", { // Replace with your API endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask a question about your plant..."
            />
            <button onClick={handleSend} disabled={loading}>
                {loading ? "Loading..." : "Send"}
            </button>
            {response && <div className="response">{response}</div>}
        </div>
    );
}