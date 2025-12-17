"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getOrCreateUserId } from '../lib/chatUtils';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ApiMessage {
    ID: number;
    UserID: string;
    Message: string;
    IsUser: boolean;
    CreatedAt: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
    const [hasChatUserId, setHasChatUserId] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastMessageIdRef = useRef<number>(0);

    // Initialize universal cookie for tracking (no login required)
    useEffect(() => {
        // Set universal cookie for tracking - this is all we need
        const userId = getOrCreateUserId();
        setHasChatUserId(!!userId);
        
        // Show initial greeting only
        setMessages([{
            id: 0,
            text: 'سلام 👋 چطور می‌تونم کمکتون کنم؟',
            isUser: false,
            timestamp: new Date()
        }]);
    }, []);

    // Load messages from API
    const loadMessages = useCallback(async () => {
        if (!hasChatUserId) return;

        try {
            const response = await fetch('/api/chat/messages', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: 1,
                    per_page: 100 // Load enough messages to show full history
                })
            });

            const data = await response.json();

            if (data.Status === 'Success' && data.Messages && data.Messages.length > 0) {
                const newMessages: Message[] = data.Messages.map((msg: ApiMessage) => ({
                    id: msg.ID,
                    text: msg.Message,
                    isUser: Boolean(msg.IsUser),
                    timestamp: new Date(msg.CreatedAt)
                }));

                // Update last message ID
                if (newMessages.length > 0) {
                    lastMessageIdRef.current = Math.max(...newMessages.map(m => m.id));
                }

                // Replace all messages with fresh data from server (to handle deletions/updates)
                setMessages(prev => {
                    // Keep the greeting if no messages exist
                    if (newMessages.length === 0 && prev.length === 1 && prev[0].id === 0) {
                        return prev;
                    }
                    
                    // Combine greeting with server messages and sort chronologically
                    const greeting = prev.find(m => m.id === 0);
                    const combined = greeting ? [greeting, ...newMessages] : newMessages;
                    return combined.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
                });
            } else if (data.Status === 'Failed' && data.Error?.includes('ChatUserId')) {
                // Cookie missing, try to recreate it
                const userId = getOrCreateUserId();
                setHasChatUserId(!!userId);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }, [hasChatUserId]);

    // Poll for new messages every second when chat is open
    useEffect(() => {
        if (isOpen && hasChatUserId) {
            // Load messages immediately when opened
            loadMessages();

            // Set up polling interval
            pollingIntervalRef.current = setInterval(() => {
                loadMessages();
            }, 1000);

            return () => {
                if (pollingIntervalRef.current) {
                    clearInterval(pollingIntervalRef.current);
                    pollingIntervalRef.current = null;
                }
            };
        } else {
            // Clear interval when chat is closed
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
                pollingIntervalRef.current = null;
            }
        }
    }, [isOpen, hasChatUserId, loadMessages]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !hasChatUserId || loading) return;

        const messageText = message.trim();
        setMessage('');
        setLoading(true);

        // Optimistically add user message
        const tempUserMessage: Message = {
            id: Date.now(), // Temporary ID
            text: messageText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, tempUserMessage]);
        
        // Check if this is the first message before updating the flag
        const isFirstMessage = !hasSentFirstMessage;
        setHasSentFirstMessage(true);

        try {
            const response = await fetch('/api/chat/send', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageText
                })
            });

            const data = await response.json();

            if (data.Status === 'Success') {
                // Reload messages to get the actual message from server
                await loadMessages();
                
                // Simulate support response only after the very first message
                if (isFirstMessage) {
                    setTimeout(() => {
                        const responseMessage: Message = {
                            id: Date.now() + 1,
                            text: 'همکاران ما به زودی به پیام شما پاسخ خواهند داد.',
                            isUser: false,
                            timestamp: new Date()
                        };
                        setMessages(prev => [...prev, responseMessage]);
                    }, 1000);
                }
            } else if (data.Status === 'Failed' && data.Error?.includes('ChatUserId')) {
                // Remove optimistic message on cookie error
                setMessages(prev => prev.filter(m => m.id !== tempUserMessage.id));
                // Try to recreate cookie
                const userId = getOrCreateUserId();
                setHasChatUserId(!!userId);
                alert('خطا در شناسایی کاربر. لطفاً صفحه را رفرش کنید.');
            } else {
                // Remove optimistic message on error
                setMessages(prev => prev.filter(m => m.id !== tempUserMessage.id));
                alert(data.Error || 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Remove optimistic message on error
            setMessages(prev => prev.filter(m => m.id !== tempUserMessage.id));
            alert('خطا در ارسال پیام. لطفاً دوباره تلاش کنید.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed md:bottom-10 bottom-5 right-5 md:right-10 z-30 p-4 bg-teal-600 shadow-xl shadow-teal-600/40 text-white rounded-full hover:bg-teal-700 transition-all duration-300 ${isOpen ? 'scale-90' : 'scale-100 hover:scale-105'
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
                className={`fixed bottom-24 right-6 z-30 w-96 bg-white rounded-2xl shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="p-4 bg-teal-600 text-white rounded-t-2xl">
                    <h3 className="text-lg font-bold">پشتیبانی آنلاین</h3>
                    <p className="text-sm text-white/80">میانگین زمان پاسخدهی 2 دقیقه</p>
                </div>

                {/* Messages */}
                <div className="p-4 h-96 overflow-y-auto space-y-4">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.isUser ? 'justify-start' : 'justify-end'}`}
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
                    {loading && (
                        <div className="flex justify-end">
                            <div className="bg-gray-100 text-gray-700 rounded-2xl rounded-bl-none p-3 max-w-[80%]">
                                <p className="text-sm text-gray-500">در حال ارسال...</p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
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
                            disabled={!hasChatUserId || loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !message.trim() || !hasChatUserId}
                            className="p-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
