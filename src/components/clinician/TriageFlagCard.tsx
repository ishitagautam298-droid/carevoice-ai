import React from 'react';
import { TriageFlag } from '../../types';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Quote, 
  ArrowRight,
  Check
} from 'lucide-react';

interface TriageFlagCardProps {
  flag: TriageFlag;
  onAcknowledge?: (id: string) => void;
}

export const TriageFlagCard: React.FC<TriageFlagCardProps> = ({ flag, onAcknowledge }) => {
  const isRed = flag.type === 'red';
  const isYellow = flag.type === 'yellow';
  const isGreen = flag.type === 'green';

  const cardBorder = isRed
    ? 'border-rose-300 bg-rose-50/50 hover:bg-rose-50'
    : isYellow
    ? 'border-amber-300 bg-amber-50/50 hover:bg-amber-50'
    : 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50';

  const badgeBg = isRed
    ? 'bg-rose-600 text-white'
    : isYellow
    ? 'bg-amber-500 text-white'
    : 'bg-emerald-600 text-white';

  const iconBg = isRed
    ? 'text-rose-600 bg-rose-100'
    : isYellow
    ? 'text-amber-600 bg-amber-100'
    : 'text-emerald-600 bg-emerald-100';

  return (
    <div className={`p-4 rounded-2xl border ${cardBorder} shadow-sm transition-all duration-200 relative`}>
      <div className="flex items-start justify-between gap-3">
        
        {/* Left Icon & Title */}
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            {isRed && <AlertOctagon className="w-5 h-5 animate-pulse" />}
            {isYellow && <AlertTriangle className="w-5 h-5" />}
            {isGreen && <CheckCircle className="w-5 h-5" />}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${badgeBg}`}>
                {isRed ? 'RED FLAG (URGENT)' : isYellow ? 'YELLOW FLAG (MONITOR)' : 'POSITIVE PROGRESS'}
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {flag.timestamp}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                {flag.category}
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900 mt-1">
              {flag.title}
            </h4>

            <p className="text-sm text-slate-600 mt-0.5">
              {flag.description}
            </p>
          </div>
        </div>

        {/* Status / Acknowledge Action */}
        <div>
          {flag.status === 'active' ? (
            <button
              onClick={() => onAcknowledge?.(flag.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Acknowledge</span>
            </button>
          ) : (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-200 text-slate-700 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> Acknowledged
            </span>
          )}
        </div>

      </div>

      {/* Patient Voice Quote */}
      {flag.relatedQuote && (
        <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border">
          <Quote className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs italic text-slate-700">
            "{flag.relatedQuote}"
          </p>
        </div>
      )}

      {/* Recommended Action */}
      <div className="mt-2.5 flex items-start gap-2 text-xs font-semibold text-slate-800">
        <ArrowRight className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
        <span><strong className="text-teal-900">Clinical Recommendation:</strong> {flag.recommendedAction}</span>
      </div>

    </div>
  );
};
