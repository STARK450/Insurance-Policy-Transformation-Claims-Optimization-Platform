
import React, { useState } from 'react';
import { MoSCoW, ProjectMethodology, ProjectStatus, Requirement } from '../types';
import { Filter, Search, Plus, MoreHorizontal } from 'lucide-react';

const INITIAL_REQUIREMENTS: Requirement[] = [
  {
    id: 'REQ-001',
    title: 'Automated Quote Generation',
    description: 'The system shall provide automated quotes for private motor insurance based on risk profile.',
    category: 'Functional',
    priority: MoSCoW.MUST,
    methodology: ProjectMethodology.WATERFALL,
    status: ProjectStatus.COMPLETED,
    stakeholder: 'Underwriting Head'
  },
  {
    id: 'REQ-002',
    title: 'FNOL Mobile Capability',
    description: 'Allow customers to log First Notice of Loss via mobile application with photo upload.',
    category: 'Functional',
    priority: MoSCoW.MUST,
    methodology: ProjectMethodology.AGILE,
    status: ProjectStatus.IN_PROGRESS,
    stakeholder: 'Claims Manager'
  },
  {
    id: 'REQ-003',
    title: 'Legacy Data Migration',
    description: 'Migrate 5 years of historical policy data from Mainframe to New Cloud SQL.',
    category: 'Non-Functional',
    priority: MoSCoW.SHOULD,
    methodology: ProjectMethodology.WATERFALL,
    status: ProjectStatus.IN_PROGRESS,
    stakeholder: 'IT Operations'
  },
  {
    id: 'REQ-004',
    title: 'AI Damage Assessment',
    description: 'Pilot AI-driven image recognition for vehicle body damage evaluation.',
    category: 'Functional',
    priority: MoSCoW.COULD,
    methodology: ProjectMethodology.AGILE,
    status: ProjectStatus.NOT_STARTED,
    stakeholder: 'Claims Strategy'
  }
];

export const Requirements: React.FC = () => {
  const [reqs] = useState<Requirement[]>(INITIAL_REQUIREMENTS);

  const getPriorityColor = (priority: MoSCoW) => {
    switch (priority) {
      case MoSCoW.MUST: return 'bg-red-100 text-red-700 border-red-200';
      case MoSCoW.SHOULD: return 'bg-amber-100 text-amber-700 border-amber-200';
      case MoSCoW.COULD: return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search requirements, stakeholders..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span className="text-sm font-medium">Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={18} />
            <span className="text-sm font-medium">Add Requirement</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Requirement & Description</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Methodology</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reqs.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">{req.id}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-800 mb-0.5">{req.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{req.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wide ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${req.methodology === ProjectMethodology.AGILE ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                    <span className="text-xs font-medium text-slate-600">{req.methodology}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium ${req.status === ProjectStatus.COMPLETED ? 'text-green-600' : 'text-slate-500'}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Methodology Legend */}
      <div className="flex items-center space-x-6 px-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs text-slate-500 font-medium">Policy Lifecycle (Waterfall)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-slate-500 font-medium">Claims Optimization (Agile)</span>
        </div>
      </div>
    </div>
  );
};
