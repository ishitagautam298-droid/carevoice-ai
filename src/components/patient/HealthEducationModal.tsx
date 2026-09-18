import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  Droplets, 
  Pill, 
  ShieldAlert, 
  Apple, 
  Volume2, 
  VolumeX, 
  X, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { speechService } from '../../services/speechService';
import { useApp } from '../../context/AppContext';

interface EducationTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
  audioText: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  keyPoints: string[];
}

export const APPROVED_EDUCATION_TOPICS: EducationTopic[] = [
  {
    id: 'heart-fluid',
    title: 'Managing Fluid Retention & Daily Weights',
    category: 'Cardiovascular Care',
    summary: 'Why tracking sudden weight shifts helps prevent heart failure flare-ups before symptoms worsen.',
    audioText: 'Tracking your weight every morning after using the bathroom is one of the most powerful ways to protect your heart. If your scale goes up by two to three pounds in a single day, or five pounds in a week, that is usually fluid, not fat. Letting your doctor know right away allows them to make a quick adjustment before you feel short of breath.',
    icon: Heart,
    accentColor: 'from-rose-500 to-pink-500',
    keyPoints: [
      'Weigh yourself every morning at the same time after emptying your bladder.',
      'A weight gain of >3 lbs in 24 hours is often fluid build-up.',
      'Elevate your legs above heart level for 20 minutes in the afternoon to reduce ankle swelling.'
    ]
  },
  {
    id: 'low-sodium',
    title: 'Low-Sodium Flavor Tips (DASH Diet)',
    category: 'Nutrition & Blood Pressure',
    summary: 'Delicious herbal seasonings to keep blood pressure healthy without sacrificing taste.',
    audioText: 'Keeping sodium below two thousand milligrams a day keeps your blood vessels relaxed and takes strain off your kidneys. You do not have to give up flavor! Try using fresh lemon juice, garlic, rosemary, and smoked paprika instead of the salt shaker.',
    icon: Apple,
    accentColor: 'from-emerald-500 to-teal-500',
    keyPoints: [
      'Aim for under 2,000 mg of sodium daily.',
      'Replace the salt shaker with garlic powder, lemon juice, or nutritional herbs.',
      'Check soup, canned food, and bread labels for hidden sodium.'
    ]
  },
  {
    id: 'hydration-seniors',
    title: 'Senior Hydration & Kidney Health',
    category: 'Hydration & Vitals',
    summary: 'How drinking small sips throughout the day prevents dizziness and fatigue.',
    audioText: 'As we grow older, our natural thirst signal becomes quieter. Sipping water consistently throughout the day rather than chugging large amounts at once helps maintain steady blood pressure, prevents lightheadedness when standing, and keeps your kidneys healthy.',
    icon: Droplets,
    accentColor: 'from-cyan-500 to-blue-500',
    keyPoints: [
      'Drink 6 to 8 small glasses of water evenly spaced throughout the day.',
      'Keep a water cup at your favorite armchair or bedside table.',
      'Monitor urine color: pale straw yellow indicates good hydration.'
    ]
  },
  {
    id: 'fall-prevention',
    title: 'Safe Mobility & Fall Prevention at Home',
    category: 'Mobility & Safety',
    summary: 'Practical tips for secure footing, lighting, and safe transitions from beds and chairs.',
    audioText: 'Staying active is wonderful for your joints, and safety at home gives you peace of mind. When getting out of bed, pause and sit on the edge for thirty seconds before standing. Ensure your hallways have nightlights, and always wear non-skid supportive footwear.',
    icon: ShieldAlert,
    accentColor: 'from-amber-500 to-orange-500',
    keyPoints: [
      'Pause for 30 seconds sitting on the bed before standing up.',
      'Remove loose rugs and keep walkways free of electrical cords.',
      'Wear sturdy shoes with rubber non-slip soles indoors.'
    ]
  },
  {
    id: 'safe-meds',
    title: 'Safe Medication Routines & Side Effect Watch',
    category: 'Medication Safety',
    summary: 'Best practices for organizing daily pill organizers and reporting dizziness.',
    audioText: 'Always take your morning medications with a full glass of water and a light bite unless your doctor says otherwise. If a medication ever makes you feel lightheaded, upset in the stomach, or dry in the throat, tell CareVoice or your clinic so we can adjust it safely.',
    icon: Pill,
    accentColor: 'from-indigo-500 to-purple-500',
    keyPoints: [
      'Use a 7-day pill organizer with AM and PM compartments.',
      'Never stop a blood pressure or heart pill without consulting your clinician.',
      'Log any new sensations or dizziness during your daily voice check-in.'
    ]
  }
];

interface HealthEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HealthEducationModal: React.FC<HealthEducationModalProps> = ({ isOpen, onClose }) => {
  const { accessibility } = useApp();
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePlayAudio = (topic: EducationTopic) => {
    if (playingId === topic.id) {
      speechService.stopSpeaking();
      setPlayingId(null);
    } else {
      speechService.stopSpeaking();
      setPlayingId(topic.id);
      speechService.speak(topic.audioText, {
        rate: accessibility.voiceSpeed,
        pitch: accessibility.voicePitch,
        onEnd: () => setPlayingId(null)
      });
    }
  };

  const handleClose = () => {
    speechService.stopSpeaking();
    setPlayingId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Approved Health & Wellness Education
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 uppercase">
                  Clinician Verified
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Easy-to-understand wellness guides with voice read-aloud for older adults
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Education Topics */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {APPROVED_EDUCATION_TOPICS.map((topic) => {
            const Icon = topic.icon;
            const isPlaying = playingId === topic.id;

            return (
              <div
                key={topic.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${topic.accentColor} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                        {topic.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {topic.title}
                      </h4>
                    </div>
                  </div>

                  {/* Listen button */}
                  <button
                    onClick={() => handlePlayAudio(topic)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition self-start sm:self-center cursor-pointer ${
                      isPlaying
                        ? 'bg-rose-600 text-white shadow-sm animate-pulse'
                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
                    }`}
                  >
                    {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isPlaying ? 'Stop Audio' : 'Listen Aloud'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {topic.summary}
                </p>

                {/* Key takeaways */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                    Key Senior Takeaways:
                  </span>
                  {topic.keyPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400">
            Education materials follow American Geriatrics Society (AGS) & AHA evidence-based guidelines.
          </p>
        </div>

      </div>
    </div>
  );
};
