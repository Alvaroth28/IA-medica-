
import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { IconSend } from '../constants';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: 'Hola, soy tu asistente experto en medicina y cirugía pediátrica. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        const trimmedInput = userInput.trim();
        if (!trimmedInput || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmedInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await generateChatResponse(trimmedInput);
            setMessages(prev => [...prev, { role: 'model', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-220px)] bg-white rounded-xl shadow-lg">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-200 text-slate-800 px-4 py-3 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
                <p className="text-center text-xs text-slate-500 mb-2">Esta herramienta es para fines educativos y no reemplaza el consejo médico profesional.</p>
                <div className="flex items-center space-x-2">
                    <Textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Escribe tu pregunta aquí..."
                        rows={1}
                        className="flex-1 resize-none"
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} isLoading={isLoading} className="p-3" aria-label="Enviar mensaje">
                        {!isLoading && <IconSend />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
