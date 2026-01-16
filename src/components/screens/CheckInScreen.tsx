import { Smile, Frown, Meh, SmilePlus, Activity, ChevronRight, Send } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';

interface CheckInScreenProps {
  proteinTotal: number;
  waterTotal: number;
  completedWorkout: { day: string; duration: string } | null;
  onCheckIn: () => void;
  onNavigate: (tab: string) => void;
}

type MoodLevel = 1 | 2 | 3 | 4 | 5;
type EnergyLevel = 'Low' | 'Medium' | 'High';

export const CheckInScreen = ({
  proteinTotal,
  waterTotal,
  completedWorkout: _completedWorkout,
  onCheckIn,
  onNavigate,
}: CheckInScreenProps) => {
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [energy, setEnergy] = useState<EnergyLevel | null>(null);
  const [sleep, setSleep] = useState('');
  const [otherWorkout, setOtherWorkout] = useState('');
  const [notes, setNotes] = useState('');

  const moodIcons = [
    { value: 1, icon: Frown, label: 'Very Bad' },
    { value: 2, icon: Frown, label: 'Bad' },
    { value: 3, icon: Meh, label: 'Okay' },
    { value: 4, icon: Smile, label: 'Good' },
    { value: 5, icon: SmilePlus, label: 'Great' },
  ] as const;

  const energyLevels: EnergyLevel[] = ['Low', 'Medium', 'High'];

  const handleSubmit = () => {
    onCheckIn();
    // Reset form
    setMood(null);
    setEnergy(null);
    setSleep('');
    setOtherWorkout('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Daily Check-in</h1>
        <p className="text-muted">How are you feeling today?</p>
      </div>

      {/* Mood */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Mood</h3>
        <div className="grid grid-cols-5 gap-2">
          {moodIcons.map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setMood(value)}
              className={cn(
                'aspect-square rounded-xl flex items-center justify-center transition-colors',
                mood === value
                  ? 'bg-primary text-black'
                  : 'bg-card-hover hover:bg-border text-muted'
              )}
            >
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>

      {/* Energy Level */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Energy Level</h3>
        <div className="grid grid-cols-3 gap-3">
          {energyLevels.map((level) => (
            <button
              key={level}
              onClick={() => setEnergy(level)}
              className={cn(
                'py-3 px-4 rounded-xl font-medium transition-colors',
                energy === level
                  ? 'bg-primary text-black'
                  : 'bg-card-hover hover:bg-border text-white'
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Hours of Sleep */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Hours of Sleep</h3>
        <input
          type="number"
          step="0.5"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          placeholder="Enter hours"
          className="w-full bg-card-hover border border-border rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Today's Workout */}
      <div className="bg-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Today's Workout</h3>
        </div>

        {/* Weight Training Workouts */}
        <button
          onClick={() => onNavigate('workouts')}
          className="w-full bg-card-hover hover:bg-border rounded-xl p-4 mb-3 transition-colors text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weight Training Workouts</p>
              <p className="text-sm text-muted">Track your sets and weights</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted" />
          </div>
        </button>

        {/* Other Workout */}
        <input
          type="text"
          value={otherWorkout}
          onChange={(e) => setOtherWorkout(e.target.value)}
          placeholder="Other workout (yoga, boxing, etc.)"
          className="w-full bg-card-hover border border-border rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Additional Notes */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Additional Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How was your day? Any concerns?"
          rows={3}
          className="w-full bg-card-hover border border-border rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {/* Today's Progress */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Today's Progress</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card-hover rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{proteinTotal}g</div>
            <div className="text-sm text-muted">Protein</div>
          </div>
          <div className="bg-card-hover rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-1">{waterTotal}oz</div>
            <div className="text-sm text-muted">Water</div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary-dark text-black py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        Submit Check-in
      </button>
    </div>
  );
};
