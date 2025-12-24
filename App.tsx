
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { Requirements } from './views/Requirements';
import { ProcessVisualizer } from './views/ProcessVisualizer';
import { AIAssistant } from './views/AIAssistant';

const PlaceholderView = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 space-y-4">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-300 border-dashed rounded-md rotate-45"></div>
    </div>
    <div className="text-center">
      <h2 className="text-xl font-bold text-slate-700">{name} Module</h2>
      <p className="text-sm">This module is currently under development in the current sprint.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/process" element={<ProcessVisualizer />} />
          <Route path="/stakeholders" element={<PlaceholderView name="Stakeholder Management" />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/docs" element={<PlaceholderView name="Documentation Repository" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
