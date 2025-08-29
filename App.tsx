
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ImageGenerator from './components/ImageGenerator';
import { IconChat, IconImage } from './constants';

type View = 'chat' | 'illustrator';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('chat');

    const NavButton: React.FC<{ view: View, label: string, icon: React.ReactNode }> = ({ view, label, icon }) => (
        <button
            onClick={() => setActiveView(view)}
            className={`flex items-center justify-center w-full sm:w-auto px-4 py-3 rounded-t-lg font-medium transition-colors text-sm sm:text-base ${
                activeView === view
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
            }`}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center text-xl sm:text-2xl font-bold text-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Asistente Pediátrico IA
                    </div>
                </div>
            </header>
            
            <main className="container mx-auto p-4 md:p-6">
                <div className="border-b border-slate-200 mb-6">
                    <nav className="flex -mb-px">
                        <NavButton view="chat" label="Chat de Consulta" icon={<IconChat />} />
                        <NavButton view="illustrator" label="Ilustrador Médico" icon={<IconImage />} />
                    </nav>
                </div>

                <div>
                    {activeView === 'chat' && <ChatWindow />}
                    {activeView === 'illustrator' && <ImageGenerator />}
                </div>
            </main>
        </div>
    );
};

export default App;
