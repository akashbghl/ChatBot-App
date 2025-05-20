import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [loading, setLoading] = useState();

    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! How can I assist you today?' },
    ]);
    const [input, setInput] = useState('');

    const bottomRef = useRef(null); // ✅ Ref for scroll

    // ✅ Scroll to bottom when messages update
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        setLoading(true);

        const userMsg = { type: 'user', text: input };
        const thinkingMsg = { type: 'bot', text: 'Thinking...' };

        // Add user message and temporary bot message
        setMessages((prev) => [...prev, userMsg, thinkingMsg]);
        setInput('');

        // Call the API and replace the last bot message with real response
        setTimeout(async () => {
            try {
                const res = await axios.post('https://chatbot-backend-xrbc.onrender.com/api/response', {
                    type: 'user',
                    text: input,
                });
                const aiMsg = {
                    type: res.data.type || 'bot',
                    text: res.data.text || 'No response from AI',
                };

                // Replace the last message (Thinking...) with actual AI response
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = aiMsg;
                    return updated;
                });

                setLoading(false);
            } catch (error) {
                console.log('kuch dikkat aa rhi hai', error.message);
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { type: 'bot', text: 'Server error occurred.' };
                    return updated;
                });
                setLoading(false);
            }
        }, 800);
    };


    return (
        <div className="flex flex-col float-end shadow-md border border-gray-300 w-full xs:w-[75%] sm:w-[75%] h-screen bg-gray-100">
            <header className="bg-blue-600 text-white text-center p-4 text-xl font-semibold">
                Your ChatBot App
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 whitespace-pre-wrap ">
                {messages.map((msg, idx) => {
                    const isNew = idx === messages.length - 1;
                    return (
                        <div
                            key={idx}
                            className={`max-w-[75%] sm:max-w-lg px-4 py-2 rounded-lg ${msg.type === 'user'
                                ? 'bg-blue-500 text-white self-end ml-auto'
                                : 'bg-gray-300 text-black self-start mr-auto'
                                }`}
                        >
                            {msg.text}
                        </div>
                    );
                })}
            <div ref={bottomRef} />
            </div>

            <footer className="p-4 bg-white border-t border-gray-300 shadow flex">
                <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Send
                </button>
            </footer>
        </div>
    );
};

export default Chatbot;
