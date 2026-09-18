import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertOctagon, 
  PhoneCall, 
  User, 
  Stethoscope, 
  X, 
  ShieldAlert 
} from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { 
    isEmergencyModalOpen, 
    setEmergencyModalOpen, 
    selectedPatient 
  } = useApp();

  if (!isEmergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-rose-500 text-slate-900 relative">
        
        {/* Close button */}
        <button
          onClick={() => setEmergencyModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          aria-label="Close emergency modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Emergency Icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
            <AlertOctagon className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-600 text-white uppercase tracking-wider">
              Urgent Clinical Alert
            </span>
            <h3 className="text-2xl font-black text-rose-900 mt-1">
              Immediate Safety Protocol
            </h3>
          </div>
        </div>

        {/* Guidance Text */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 my-4 text-rose-900">
          <p className="text-base font-bold">
            {selectedPatient.name.split(' ')[0]}, if you are experiencing severe chest pressure, sudden breathing difficulty, or feel faint:
          </p>
          <p className="text-sm font-medium mt-1 text-rose-800">
            Please sit down immediately in a comfortable chair. Do not try to walk alone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-6">
          <a
            href="tel:911"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-lg shadow-lg shadow-rose-600/30 transition transform hover:scale-[1.02]"
          >
            <PhoneCall className="w-6 h-6" />
            <span>Call 911 (Emergency Services)</span>
          </a>

          <a
            href={`tel:${selectedPatient.emergencyContact.phone}`}
            className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 transition"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-teal-600" />
              <div className="text-left">
                <p className="text-xs text-slate-500">Call Caregiver / Family</p>
                <p className="text-sm font-bold">{selectedPatient.emergencyContact.name}</p>
              </div>
            </div>
            <span className="text-teal-700 text-sm font-extrabold">{selectedPatient.emergencyContact.phone}</span>
          </a>

          <a
            href={`tel:${selectedPatient.primaryPhysician.phone}`}
            className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 transition"
          >
            <div className="flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <div className="text-left">
                <p className="text-xs text-slate-500">Call Clinic On-Call Team</p>
                <p className="text-sm font-bold">{selectedPatient.primaryPhysician.name}</p>
              </div>
            </div>
            <span className="text-teal-700 text-sm font-extrabold">{selectedPatient.primaryPhysician.phone}</span>
          </a>
        </div>

        {/* Dismiss safe button */}
        <button
          onClick={() => setEmergencyModalOpen(false)}
          className="mt-6 w-full py-2.5 text-center text-sm font-bold text-slate-500 hover:text-slate-800 transition"
        >
          I am safe right now. Return to conversation.
        </button>

      </div>
    </div>
  );
};
