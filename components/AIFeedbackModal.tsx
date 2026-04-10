import React from 'react';
import { X, Sparkles, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { AIResponse } from '../services/aiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: AIResponse | null;
  isLoading: boolean;
}

export const AIFeedbackModal: React.FC<Props> = ({ isOpen, onClose, data, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Feedback da Atividade</h3>
              <p className="text-xs text-indigo-100 opacity-90">Análise preliminar das respostas</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar bg-slate-50">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium animate-pulse">Lendo suas respostas...</p>
              <p className="text-xs text-slate-400">Verificando consistência filosófica...</p>
            </div>
          ) : data ? (
            <div className="space-y-8">
              {/* Comentário Geral */}
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
                <h4 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> 
                  Parecer Geral
                </h4>
                <p className="text-slate-700 leading-relaxed italic">
                  "{data.generalComment}"
                </p>
              </div>

              {/* Correções Individuais */}
              <div className="space-y-6">
                <h4 className="font-bold text-slate-800 text-lg border-b pb-2">Detalhamento das Respostas</h4>
                
                {data.corrections.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-semibold text-slate-800 text-sm bg-slate-100 px-3 py-1 rounded-md">
                        Questão: {item.question.length > 60 ? item.question.substring(0, 60) + '...' : item.question}
                      </h5>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        item.isCorrect 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.isCorrect ? (
                          <><CheckCircle className="w-3 h-3" /> Bom argumento</>
                        ) : (
                          <><AlertCircle className="w-3 h-3" /> Revisar conceito</>
                        )}
                        <span className="ml-1 border-l border-current pl-2">Nota: {item.score}/10</span>
                      </div>
                    </div>

                    <div className="mb-4 pl-4 border-l-2 border-slate-300">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Sua resposta:</p>
                      <p className="text-slate-600 italic text-sm">"{item.studentAnswer}"</p>
                    </div>

                    <div className={`p-4 rounded-lg text-sm ${item.isCorrect ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-900'}`}>
                      <span className="font-bold block mb-1">Comentário:</span>
                      {item.feedback}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Não foi possível gerar a análise no momento. Tente novamente.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};