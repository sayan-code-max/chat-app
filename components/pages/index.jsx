import React, { useState, useEffect } from "react";
import { sendMassagetoGoogleGemini } from './../ChatCompo';

function Index() {
    const [inputValue, setinputValue] = useState("");
    const [Messages, setMessages] = useState([]);
    const [isStarted, setisStarted] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [historyVisible, setHistoryVisible] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);

    // 🔄 Load chat history on mount
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        setChatHistory(savedHistory);
    }, []);

    // 🧠 Save new message to history
    const updateChatHistory = (newMessages) => {
        const updatedHistory = [...chatHistory, newMessages];
        localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
        setChatHistory(updatedHistory);
    };

    const handleSubmit = async () => {
        const prompt = inputValue.trim();
        if (!prompt) return;

        if (!isStarted) setisStarted(true);

        const userMsg = { text: prompt, sender: 'user' };
        setMessages((prev) => [...prev, userMsg]);

        setinputValue("");
        setWaiting(true);

        try {
            const reply = await sendMassagetoGoogleGemini(prompt);
            const aiMsg = { text: reply, sender: 'gemini' };

            const newConversation = [userMsg, aiMsg];
            setMessages((prev) => [...prev, aiMsg]);
            updateChatHistory(newConversation); //  store new conversation
        } catch (error) {
            setMessages((prev) => [...prev, { text: "Could not Fetch Response", sender: 'gemini' }]);
        } finally {
            setWaiting(false);
        }
    };

    return (
        <div className="container my-5">
            <button
                onClick={() => setHistoryVisible(!historyVisible)}
                className="btn btn-secondary mb-3"
            >
                {historyVisible ? "Hide" : "Show"} Chat History
            </button>

            {historyVisible && (
                <div className="history-box mb-4">
                    <h4>Chat History</h4>
                    {chatHistory.length === 0 && <p>No previous chats.</p>}
                    {chatHistory.map((session, i) => (
                        <div key={i} className="history-item mb-3">
                            {session.map((msg, j) => (
                                <p key={j} className={msg.sender === "user" ? "my-chat" : "ai-ans"}>
                                    <i className={`bi ${msg.sender === "user" ? "bi-person" : "bi-robot"} me-2`}></i>
                                    {msg.text}
                                </p>
                            ))}
                            <hr />
                        </div>
                    ))}
                </div>
            )}

            {!isStarted && (
                <div className="head-title text-center mb-4">
                    <h2>How can I help !!</h2>
                </div>
            )}

            {isStarted && (
                <div className="chat-app mt-5 pt-5">
                    <h1 className="heading-chatbot">
                        <i className="bi-robot"></i> Chatbot
                    </h1>

                    {Messages.map((msg, index) => (
                        <p key={index} className={`${msg.sender === "user" ? "my-chat" : "ai-ans"} pb-2`}>
                            <i className={`bi ${msg.sender === "user" ? "bi-person-circle me-3" : "bi-robot me-3"}`}></i>
                            {msg.text}
                        </p>
                    ))}

                    {waiting && (
                        <h6 className="ai-ans pb-4">
                            <i className="bi bi-robot me-3"></i> ...
                        </h6>
                    )}
                </div>
            )}

            <div className="input-box d-flex align-content-center mt-4">
                <input
                    type="text"
                    placeholder="Ask what you want"
                    value={inputValue}
                    onChange={e => setinputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                <i
                    className="bi bi-box-arrow-in-right fs-4"
                    onClick={handleSubmit}
                    style={{ cursor: 'pointer' }}
                ></i>
            </div>
        </div>
    );
}

export default Index;
