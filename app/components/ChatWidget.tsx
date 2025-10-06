"use client"
import React, { useState } from 'react';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'سلام 👋 چطور می‌تونم کمکتون کنم؟',
            isUser: false,
            timestamp: new Date()
        }
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: messages.length + 1,
            text: message,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setMessage('');

        // Simulate response after 1 second
        setTimeout(() => {
            const responseMessage: Message = {
                id: messages.length + 2,
                text: 'همکاران ما به زودی به پیام شما پاسخ خواهند داد.',
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, responseMessage]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-10 right-10 z-50 p-4 bg-teal-600 shadow-xl shadow-teal-600/40 text-white rounded-full hover:bg-teal-700 transition-all duration-300 ${isOpen ? 'scale-90' : 'scale-100 hover:scale-105'
                    }`}
            >
                {isOpen ? (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className='size-10 flex items-center justify-center text-2xl'>
                        <i className="fi fi-sr-comments mt-1.5"></i>
                    </div>

                )}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="p-4 bg-teal-600 text-white rounded-t-2xl">
                    <h3 className="text-lg font-bold">پشتیبانی آنلاین</h3>
                    <p className="text-sm text-white/80">با ما در ارتباط باشید</p>
                </div>

                {/* Messages */}
                <div className="p-4 h-96 overflow-y-auto space-y-4">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl ${msg.isUser
                                    ? 'bg-teal-600 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-700 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <span className={`text-[10px] ${msg.isUser ? 'text-white/80' : 'text-gray-500'}`}>
                                    {msg.timestamp.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="پیام خود را بنویسید..."
                            className="flex-grow p-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-600"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
