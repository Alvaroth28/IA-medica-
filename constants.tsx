
import React from 'react';

export const CHAT_MODEL_NAME = 'gemini-2.5-flash';
export const IMAGE_MODEL_NAME = 'imagen-4.0-generate-001';

export const PEDIATRIC_EXPERT_SYSTEM_INSTRUCTION = `Eres un asistente de inteligencia artificial altamente especializado en medicina y cirugía pediátrica. Tu propósito es proporcionar información precisa, detallada y educativa a profesionales de la salud, residentes y estudiantes de medicina. Debes responder a las preguntas con un lenguaje técnico pero claro, explicando conceptos complejos de manera comprensible. Cuando se te pida describir procedimientos quirúrgicos o malformaciones, sé sistemático y minucioso. **Bajo ninguna circunstancia debes proporcionar consejos médicos directos a pacientes o familiares. Siempre debes enfatizar que tu información es para fines educativos y no reemplaza la consulta con un profesional médico cualificado.**`;

export const IMAGE_GENERATION_PROMPT_PREFIX = `Ilustración médica detallada y anatómicamente correcta, con un estilo claro de libro de texto de anatomía. Fondo blanco. Representar: `;

export const IconChat = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

export const IconImage = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const IconSend = ({ className = 'h-6 w-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);
