import React, { useState } from 'react';
import { TrendMetric } from '../../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';
import { Activity, Pill, Moon, Droplets, TrendingUp } from 'lucide-react';

interface HealthTrendsChartProps {
  data: TrendMetric[];
}

export const HealthTrendsChart: React.FC<HealthTrendsChartProps> = ({ data }) => {
  const [metricTab, setMetricTab] = useState<'vitals' | 'adherence' | 'sleep_pain' | 'lifestyle'>('vitals');

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span>Longitudinal Health Trends (7-Day Overview)</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Aggregated from daily voice check-ins & smart home vitals
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setMetricTab('vitals')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricTab === 'vitals' ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Blood Pressure & Weight
          </button>
          <button
            onClick={() => setMetricTab('adherence')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricTab === 'adherence' ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Medication %
          </button>
          <button
            onClick={() => setMetricTab('sleep_pain')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricTab === 'sleep_pain' ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sleep & Pain
          </button>
          <button
            onClick={() => setMetricTab('lifestyle')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricTab === 'lifestyle' ? 'bg-white text-teal-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hydration & Steps
          </button>
        </div>
      </div>

      {/* Chart Render Area */}
      <div className="h-72 w-full">
        {metricTab === 'vitals' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis yAxisId="left" stroke="#ef4444" fontSize={12} domain={[70, 160]} />
              <YAxis yAxisId="right" orientation="right" stroke="#0ea5e9" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="systolicBP" name="Systolic BP (mmHg)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line yAxisId="left" type="monotone" dataKey="diastolicBP" name="Diastolic BP (mmHg)" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" />
              <Line yAxisId="right" type="monotone" dataKey="weightLbs" name="Weight (lbs)" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {metricTab === 'adherence' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorAdh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#10b981" fontSize={12} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="adherencePercent" name="Medication Adherence %" stroke="#10b981" fillOpacity={1} fill="url(#colorAdh)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {metricTab === 'sleep_pain' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis yAxisId="left" stroke="#8b5cf6" fontSize={12} domain={[0, 12]} unit="h" />
              <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={12} domain={[0, 10]} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sleepHours" name="Sleep Duration (Hours)" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="painLevel" name="Pain Level (0-10 Scale)" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {metricTab === 'lifestyle' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="dayLabel" stroke="#94a3b8" fontSize={12} />
              <YAxis yAxisId="left" stroke="#06b6d4" fontSize={12} domain={[0, 12]} unit=" gl" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} domain={[0, 8000]} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="waterGlasses" name="Water Intake (8oz Glasses)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="stepsCount" name="Daily Steps" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};
