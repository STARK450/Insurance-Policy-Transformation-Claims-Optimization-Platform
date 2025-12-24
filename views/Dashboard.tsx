
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ClipboardCheck, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

const data = [
  { name: 'Policy Mgmt (Waterfall)', progress: 75, color: '#3b82f6' },
  { name: 'Claims Ops (Agile)', progress: 45, color: '#10b981' },
  { name: 'UW Integration', progress: 30, color: '#f59e0b' },
  { name: 'Legacy Migration', progress: 90, color: '#8b5cf6' },
];

const pieData = [
  { name: 'Must Have', value: 45, color: '#ef4444' },
  { name: 'Should Have', value: 30, color: '#f59e0b' },
  { name: 'Could Have', value: 15, color: '#3b82f6' },
  { name: 'Wont Have', value: 10, color: '#64748b' },
];

const StatCard = ({ title, value, subValue, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <p className={`text-xs mt-1 font-medium ${colorClass}`}>{subValue}</p>
      </div>
      <div className={`p-3 rounded-lg ${colorClass.replace('text-', 'bg-').replace('700', '100')}`}>
        <Icon size={24} className={colorClass} />
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Requirements Captured" value="128" subValue="+12 this week" icon={ClipboardCheck} colorClass="text-blue-700" />
        <StatCard title="Sprint Velocity" value="42 pts" subValue="Next sprint: Apr 2" icon={Clock} colorClass="text-green-700" />
        <StatCard title="Open Impediments" value="3" subValue="High Priority" icon={AlertCircle} colorClass="text-amber-700" />
        <StatCard title="Stakeholder Sign-offs" value="85%" subValue="Target: 100%" icon={CheckCircle2} colorClass="text-indigo-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Module Delivery Progress</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={32}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Split */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6">MoSCoW Breakdown</h2>
          <div className="flex flex-col md:flex-row items-center h-80">
            <div className="w-full md:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 px-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Project Updates</h2>
          <button className="text-xs text-blue-600 font-semibold hover:underline">View All Logs</button>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-4 flex items-center space-x-4 hover:bg-slate-50 transition-colors">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="flex-1">
              <p className="text-sm text-slate-800 font-medium">Claims Module Sprint 4 Backlog Grooming</p>
              <p className="text-xs text-slate-500">2 hours ago • Agile Sprints</p>
            </div>
            <span className="text-xs font-medium text-slate-400">Completed</span>
          </div>
          <div className="p-4 flex items-center space-x-4 hover:bg-slate-50 transition-colors">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="flex-1">
              <p className="text-sm text-slate-800 font-medium">Policy Binding Flow Sign-off Delayed</p>
              <p className="text-xs text-slate-500">5 hours ago • Underwriting Team</p>
            </div>
            <span className="text-xs font-medium text-amber-600">Pending Review</span>
          </div>
          <div className="p-4 flex items-center space-x-4 hover:bg-slate-50 transition-colors">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="flex-1">
              <p className="text-sm text-slate-800 font-medium">Legacy Quote Engine FRD Version 2.4 Published</p>
              <p className="text-xs text-slate-500">Yesterday • Waterfall BRDs</p>
            </div>
            <span className="text-xs font-medium text-green-600">Success</span>
          </div>
        </div>
      </div>
    </div>
  );
};
