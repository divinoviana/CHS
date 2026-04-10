
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { ChartData, TableData, CrosswordData, ActivityImage } from '../types';
import { Table, ImageIcon, BarChart3, Grid3X3 } from 'lucide-react';

interface Props {
  content: {
    type: 'image' | 'chart' | 'table' | 'crossword';
    data: any;
  };
}

const COLORS = ['#003399', '#FFCE00', '#009933', '#6366f1', '#ec4899', '#f59e0b'];

export const VisualActivityRenderer: React.FC<Props> = ({ content }) => {
  if (!content || !content.data) return null;
  const { type, data } = content;

  if (type === 'image') {
    const imageData = data as ActivityImage;
    if (!imageData.url) return null;
    return (
      <div className="my-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="text-tocantins-blue" size={20} />
          <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Recurso Visual: Ilustração</h4>
        </div>
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white p-2">
          <img 
            src={imageData.url} 
            alt={imageData.caption || 'Ilustração'} 
            className="w-full h-auto rounded-2xl"
            referrerPolicy="no-referrer"
          />
          {imageData.caption && (
            <p className="p-4 text-center text-sm text-slate-500 italic font-medium">
              {imageData.caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (type === 'chart') {
    const chartData = data as ChartData;
    if (!chartData.data || !Array.isArray(chartData.data)) return null;
    return (
      <div className="my-8 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-indigo-500" size={20} />
          <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Análise de Dados: {chartData.title || 'Gráfico'}</h4>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartData.type === 'bar' ? (
              <BarChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#003399" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : chartData.type === 'line' ? (
              <LineChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#003399" strokeWidth={3} dot={{ r: 6, fill: '#003399' }} />
              </LineChart>
            ) : (
              <PieChart>
                <Pie
                  data={chartData.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    const tableData = data as TableData;
    if (!tableData.headers || !tableData.rows) return null;
    return (
      <div className="my-8 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
          <Table className="text-emerald-500" size={20} />
          <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Informação Estruturada: {tableData.title || 'Tabela'}</h4>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                {tableData.headers.map((h, i) => (
                  <th key={i} className="p-4 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-100">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="p-4 text-sm text-slate-600 border-b border-slate-50">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'crossword') {
    const crosswordData = data as CrosswordData;
    if (!crosswordData.grid || !crosswordData.clues) return null;
    return (
      <div className="my-8 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Grid3X3 className="text-amber-500" size={20} />
          <h4 className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Desafio: Palavras Cruzadas</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Grid Rendering */}
          <div className="flex justify-center items-center">
            <div 
              className="grid gap-1 bg-slate-200 p-1 rounded-lg shadow-inner"
              style={{ 
                gridTemplateColumns: `repeat(${crosswordData.grid[0]?.length || 0}, minmax(30px, 1fr))`,
                width: 'fit-content'
              }}
            >
              {crosswordData.grid.map((row, rIdx) => (
                row.map((cell, cIdx) => {
                  const isBlock = cell === ' ' || cell === null || cell === '#';
                  const acrossClue = crosswordData.clues.across?.find(c => c.row === rIdx && c.col === cIdx);
                  const downClue = crosswordData.clues.down?.find(c => c.row === rIdx && c.col === cIdx);
                  const clueNumber = acrossClue?.number || downClue?.number;

                  return (
                    <div 
                      key={`${rIdx}-${cIdx}`}
                      className={`relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm font-bold uppercase transition-all ${isBlock ? 'bg-slate-800' : 'bg-white'}`}
                    >
                      {clueNumber && (
                        <span className="absolute top-0.5 left-0.5 text-[8px] leading-none text-slate-400">
                          {clueNumber}
                        </span>
                      )}
                      {!isBlock && (
                        <input 
                          type="text" 
                          maxLength={1}
                          className="w-full h-full text-center bg-transparent focus:bg-blue-50 focus:outline-none uppercase"
                        />
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>

          {/* Clues Rendering */}
          <div className="space-y-6">
            <div>
              <h5 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1 text-sm">Horizontais</h5>
              <ul className="space-y-2">
                {crosswordData.clues.across?.map(clue => (
                  <li key={`across-${clue.number}`} className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-black text-tocantins-blue mr-2">{clue.number}.</span>
                    {clue.clue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1 text-sm">Verticais</h5>
              <ul className="space-y-2">
                {crosswordData.clues.down?.map(clue => (
                  <li key={`down-${clue.number}`} className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-black text-tocantins-blue mr-2">{clue.number}.</span>
                    {clue.clue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
