
import React, { useState } from 'react';
import { transformRequirementToStory } from '../services/geminiService';
// Added missing Info import
import { Zap, Loader2, Copy, CheckCircle, ArrowRight, Info } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleTransform = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const story = await transformRequirementToStory(input);
      setResult(story);
    } catch (error) {
      console.error(error);
      alert("Transformation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `As a ${result.asA}, I want ${result.iWant}, so that ${result.soThat}.\n\nAcceptance Criteria:\n${result.acceptanceCriteria.map((c: string) => `- ${c}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">BA Transformation Assistant</h2>
        <p className="text-slate-500">Accelerate documentation by converting legacy requirements into Agile User Stories using Gemini AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Legacy Requirement</label>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono">TEXT_INPUT</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., The system should let the claims handler look up policy details by car plate number and check if the driver is covered for accidental damage manually."
            className="w-full h-64 p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-slate-800 leading-relaxed shadow-sm"
          />
          <button
            onClick={handleTransform}
            disabled={loading || !input.trim()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-200"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
            <span>Transform to User Story</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Agile Output</label>
            {result && (
              <button onClick={copyToClipboard} className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 text-xs font-bold">
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Story'}</span>
              </button>
            )}
          </div>
          
          <div className="w-full min-h-[16rem] bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden">
            {!result && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-2">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                   <ArrowRight size={20} />
                </div>
                <p className="text-xs font-medium uppercase">Awaiting Transformation</p>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10">
                <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 uppercase">Analyzing with Gemini...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">User Story</p>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    <span className="font-bold">As a</span> {result.asA}, 
                    <span className="font-bold"> I want</span> {result.iWant}, 
                    <span className="font-bold"> so that</span> {result.soThat}.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Acceptance Criteria</p>
                  <ul className="space-y-2">
                    {result.acceptanceCriteria.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-slate-700">
                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start space-x-3">
             <div className="p-1 bg-amber-200 rounded text-amber-800">
               <Info size={14} />
             </div>
             <p className="text-[11px] text-amber-800 leading-normal">
               AI output should be reviewed and validated by the Senior BA before moving to the JIRA backlog for Sprint Planning.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
