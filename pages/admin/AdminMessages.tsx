
import React, { useState } from 'react';
import { MOCK_MESSAGES } from '../../constants';
import { ContactMessage } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { generateContactReply } from '../../services/geminiService';
import { Clipboard, Check } from 'lucide-react';

const MessageCard: React.FC<{ message: ContactMessage, onReplied: (id: string) => void }> = ({ message, onReplied }) => {
    const [aiReply, setAiReply] = useState(message.aiReply || '');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerateReply = async () => {
        setIsLoading(true);
        const reply = await generateContactReply(message);
        setAiReply(reply);
        message.aiReply = reply; // Persist for demo session
        setIsLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(aiReply);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold">{message.name} <span className="font-normal text-sm text-gray-500">&lt;{message.email}&gt;</span></h3>
                    <p className="text-xs text-gray-400">{new Date(message.createdAt).toLocaleString()}</p>
                </div>
                {!message.replied && <Button size="sm" onClick={() => onReplied(message.id)}>Mark as Replied</Button>}
            </div>
            <p className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">{message.message}</p>
            
            <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-semibold mb-2">AI Generated Reply:</h4>
                {aiReply ? (
                     <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm">
                        <p className="whitespace-pre-wrap">{aiReply}</p>
                        <div className="text-right mt-2">
                            <button onClick={handleCopy} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                {copied ? <Check size={16} className="inline text-green-500"/> : <Clipboard size={16} className="inline"/>} Copy Reply
                            </button>
                        </div>
                    </div>
                ) : (
                    <Button onClick={handleGenerateReply} disabled={isLoading} size="sm">
                        {isLoading ? 'Generating...' : 'Generate Professional Reply'}
                    </Button>
                )}
            </div>
        </Card>
    )
}

const AdminMessages: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>(MOCK_MESSAGES);

    const handleMarkReplied = (id: string) => {
        setMessages(prev => prev.map(msg => msg.id === id ? {...msg, replied: true} : msg));
    };
    
    const pendingMessages = messages.filter(m => !m.replied);
    const repliedMessages = messages.filter(m => m.replied);

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold">Contact Messages</h1>
            
            <div>
                <h2 className="text-2xl font-semibold mb-4">Pending Replies</h2>
                <div className="space-y-4">
                    {pendingMessages.length > 0 ? (
                        pendingMessages.map(msg => <MessageCard key={msg.id} message={msg} onReplied={handleMarkReplied}/>)
                    ) : (
                        <p>No pending messages.</p>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Replied</h2>
                 <div className="space-y-4">
                    {repliedMessages.length > 0 ? (
                        repliedMessages.map(msg => <MessageCard key={msg.id} message={msg} onReplied={handleMarkReplied} />)
                    ) : (
                        <p>No replied messages.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;
