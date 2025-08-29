
import React, { useState } from 'react';
import { generateMedicalImage } from '../services/geminiService';
import Card from './ui/Card';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import Spinner from './ui/Spinner';
import { IconImage } from '../constants';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const examplePrompts = [
    "Tetralogía de Fallot",
    "Atresia esofágica con fístula",
    "Gastrosquisis neonatal",
    "Onfalocele gigante",
    "Procedimiento de Kasai",
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageBytes = await generateMedicalImage(prompt);
      setGeneratedImage(`data:image/jpeg;base64,${imageBytes}`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message || 'Ocurrió un error inesperado.');
        } else {
            setError('Ocurrió un error inesperado.');
        }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Ilustrador Médico</h2>
          <p className="text-slate-600">
            Describe una condición, malformación o procedimiento quirúrgico pediátrico para generar una ilustración médica.
          </p>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: 'Corazón con comunicación interventricular'..."
            rows={4}
            disabled={isLoading}
          />
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-slate-500">Sugerencias:</span>
            {examplePrompts.map(ex => (
              <button 
                key={ex} 
                onClick={() => handleExampleClick(ex)}
                disabled={isLoading}
                className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-colors disabled:opacity-50"
              >
                {ex}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleGenerate} isLoading={isLoading} className="w-full sm:w-auto">
              {isLoading ? 'Generando...' : 'Generar Ilustración'}
            </Button>
          </div>
        </div>
      </Card>

      {error && (
        <Card className="border-red-500 border bg-red-50">
          <p className="text-red-700 font-semibold">Error</p>
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      <Card className="min-h-[512px] flex items-center justify-center bg-slate-50/50">
        {isLoading && <Spinner />}
        {!isLoading && !generatedImage && (
          <div className="text-center text-slate-500">
            <IconImage className="mx-auto h-16 w-16 text-slate-400" />
            <p className="mt-2">La ilustración generada aparecerá aquí.</p>
          </div>
        )}
        {generatedImage && (
          <img src={generatedImage} alt={prompt} className="rounded-lg shadow-md max-w-full max-h-[512px]" />
        )}
      </Card>
      <p className="text-center text-xs text-slate-500 mt-4 px-4">Esta herramienta es para fines educativos. Las imágenes son generadas por IA y pueden no ser 100% precisas.</p>
    </div>
  );
};

export default ImageGenerator;
