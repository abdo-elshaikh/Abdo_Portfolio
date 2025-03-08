import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, X as XIcon, MessageSquareText as ChatIcon, CircleUser as AvatarIcon, Send } from 'lucide-react';
import { liveChatApi, userApi } from '../lib/api';
import type { User, Message } from '../lib/types';

const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function LiveChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout>();

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { user } = await userApi.getUser();
                setUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    // Subscribe to real-time messages
    useEffect(() => {
        if (!user) return;

        const subscription = liveChatApi.subscribeToMessages((newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
            scrollToBottom('smooth');
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [user]);

    // Fetch initial messages
    useEffect(() => {
        if (!isOpen) return;

        const loadMessages = async () => {
            try {
                const messages = await liveChatApi.getAllMessages();
                setMessages(messages);
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        };

        loadMessages();
    }, [isOpen]);

    // Auto-scroll to bottom
    const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
        const container = messagesEndRef.current?.parentElement;
        if (container && container.scrollHeight - container.scrollTop - container.clientHeight < 100) {
            messagesEndRef.current?.scrollIntoView({ behavior });
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Typing indicator with debouncing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
        if (!isTyping) setIsTyping(true);

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 1500);
    };

    // Send message with optimistic updates
    const sendMessage = async () => {
        if (!newMessage.trim() || !user || isSending) return;

        const tempId = Date.now().toString();
        const newMsg: Message = {
            id: tempId,
            user_id: user.id,
            username: user.username,
            message: newMessage,
            status: 'sent',
            created_at: new Date().toISOString(),
        };

        try {
            setIsSending(true);
            setMessages((prev) => [...prev, newMsg]);
            setNewMessage('');
            scrollToBottom('auto');

            await liveChatApi.sendMessage(newMessage);

            setMessages((prev) =>
                prev.map((m) => (m.id === tempId ? { ...m, status: 'delivered' } : m))
            );
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) =>
                prev.map((m) => (m.id === tempId ? { ...m, status: 'error' } : m))
            );
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-indigo-600 rounded-full shadow-xl flex items-center justify-center
                   hover:bg-indigo-700 transition-all duration-300 group focus:outline-none focus:ring-2
                   focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <XIcon className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative"
                        >
                            <ChatIcon className="w-6 h-6 text-white" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed sm:absolute bottom-16 right-0 sm:w-96 w-full h-[calc(100vh-8rem)] sm:h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl
                       flex flex-col border border-gray-100 dark:border-gray-800"
                    >
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 rounded-t-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                            <AvatarIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold">Live Support</h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {isTyping ? 'typing...' : 'Online'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="sm:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                    aria-label="Close chat"
                                >
                                    <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[75%] rounded-xl p-3 relative ${message?.user_id === user?.id
                                            ? 'bg-indigo-500 text-white rounded-br-none'
                                            : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                                            } ${message?.status === 'error' ? 'bg-red-100 dark:bg-red-900' : ''}`}
                                    >
                                        {message?.user_id !== user?.id && (
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 block mb-1">
                                                {message.username}
                                            </span>
                                        )}
                                        <p className="text-sm break-words">{message.message}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs opacity-70">
                                                {formatTimestamp(message.created_at)}
                                            </span>
                                            {message.user_id === user?.id && (
                                                <div className="flex items-center gap-1 ml-2">
                                                    {message.status === 'sent' && (
                                                        <ClockIcon className="w-3 h-3 opacity-70" />
                                                    )}
                                                    {message.status === 'delivered' && (
                                                        <span className="text-xs">✓</span>
                                                    )}
                                                    {message.status === 'error' && (
                                                        <span
                                                            className="text-xs text-red-500"
                                                            title="Failed to send message"
                                                        >
                                                            !
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex gap-2">
                                <input
                                    value={newMessage}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage();
                                        }
                                    }}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-950 rounded-full border-none
                             focus:ring-2 focus:ring-indigo-500 focus:outline-none
                             disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSending}
                                    aria-label="Type your message"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim() || isSending}
                                    className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center
                             hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                    aria-label="Send message"
                                >
                                    {isSending ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            <Send className="w-4 h-4 text-white" />
                                        </motion.div>
                                    ) : (
                                        <Send className="w-4 h-4 text-white" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}