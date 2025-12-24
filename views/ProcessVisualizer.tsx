
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle, Info } from 'lucide-react';

const POLICY_LIFECYCLE_STEPS = [
  { id: 'quote', title: 'Quote', old: 'Manual data entry across 3 systems', new: 'Unified automated portal with CRM integration' },
  { id: 'uw', title: 'Underwriting', old: 'Email based referrals, 48hr turnaround', new: 'Automated rules engine, 2min turnaround' },
  { id: 'bind', title: 'Bind & Issue', old: 'Physical paper printing, postal delivery', new: 'Instant digital policy vault, e-Sign enabled' },
  { id: 'renew', title: 'Renewal', old: 'Manual callouts 30 days prior', new: 'Proactive AI-driven renewal triggers' }
];

const CLAIMS_LIFECYCLE_STEPS = [
  { id: 'fnol', title: 'FNOL', old: 'Call center only (9-5)', new: '24/7 Multi-channel (App/Web/Call)' },
  { id: 'assess', title: 'Assessment', old: 'Physical surveyor visit required', new: 'Photo-based AI triage & estimation' },
  { id: 'settle', title: 'Settlement', old: 'Cheque payments, 14 days process', new: 'Real-time bank transfer, < 1 hour' }
];

export const ProcessVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'policy' | 'claims'>('policy');

  const steps = activeTab === 'policy' ? POLICY_LIFECYCLE_STEPS : CLAIMS_LIFECYCLE_STEPS;

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 inline-flex">
        <button 
          onClick={() => setActiveTab('policy')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'policy' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Policy Lifecycle (Waterfall)
        </button>
        <button 
          onClick={() => setActiveTab('claims')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'claims' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Claims Lifecycle (Agile)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Process Map */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-800">Business Transformation Map</h2>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">As-Is vs To-Be</span>
          </div>

          <div className="relative space-y-4">
            {/* Vertical Line Connector */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 z-0"></div>
            
            {steps.map((step, idx) => (
              <div key={step.id} className="relative z-10 bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${idx === 0 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <span className="text-sm font-bold">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-bold text-slate-800 mb-3">{step.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                        <span className="block text-[10px] font-bold text-red-700 uppercase mb-1">Legacy Process</span>
                        <p className="text-xs text-slate-600 italic">"{step.old}"</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                        <span className="block text-[10px] font-bold text-green-700 uppercase mb-1">Future Process</span>
                        <p className="text-xs text-slate-800 font-medium">{step.new}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transformation Insights */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Info size={120} />
             </div>
             <h2 className="text-xl font-bold mb-4 relative z-10">BA Strategy: {activeTab === 'policy' ? 'Stability First' : 'Speed & Innovation'}</h2>
             <p className="text-slate-300 text-sm mb-6 leading-relaxed relative z-10">
               {activeTab === 'policy' 
                ? 'We chose a Waterfall delivery for the Policy module to ensure regulatory compliance and complex legacy core integration stability. Requirements are baselined and signed-off by Legal and Underwriting.' 
                : 'Claims optimization uses Agile (Scrum) to iteratively improve customer UX. This allows us to pivot based on early FNOL pilot feedback and integrate AI models progressively.'}
             </p>
             <div className="space-y-3 relative z-10">
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle size={18} className="text-green-400" />
                  <span>Stakeholder alignment workshops completed</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle size={18} className="text-green-400" />
                  <span>Regulatory impact assessment approved</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle size={18} className="text-green-400" />
                  <span>UAT readiness criteria established</span>
                </div>
             </div>
             <button className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-colors">
               View Full BRD Documentation
             </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 uppercase mb-4 tracking-wider">Key Transformation Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">Turnaround Time (TAT) Improvement</span>
                  <span className="text-blue-600 font-bold">85% Targeted</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">Customer Satisfaction (CSAT)</span>
                  <span className="text-green-600 font-bold">+12pts Improvement</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[65%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
