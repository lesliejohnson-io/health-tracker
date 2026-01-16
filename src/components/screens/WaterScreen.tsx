import { Droplet, Plus } from 'lucide-react';
import { useState } from 'react';

interface WaterScreenProps {
  total: number;
  onAdd: (amount: number) => void;
}

const DAILY_GOAL = 100;

export const WaterScreen = ({ total, onAdd }: WaterScreenProps) => {
  const [customAmount, setCustomAmount] = useState('');
  const percentage = Math.min((total / DAILY_GOAL) * 100, 100);

  const quickAddButtons = [8, 16, 32];

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0) {
      onAdd(amount);
      setCustomAmount('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Water Tracker</h1>
        <p className="text-muted">Stay hydrated throughout the day</p>
      </div>

      {/* Water Card */}
      <div className="bg-card rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
            <Droplet className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Water</h2>
            <p className="text-sm text-muted">Daily Goal: {DAILY_GOAL} oz</p>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="flex items-center justify-center py-6">
          <div className="relative w-48 h-48">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-card-hover"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                className="text-orange-500 transition-all duration-500"
                style={{
                  strokeDasharray: `${2 * Math.PI * 88}`,
                  strokeDashoffset: `${2 * Math.PI * 88 * (1 - percentage / 100)}`,
                }}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{total}</span>
              <span className="text-muted">oz</span>
            </div>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {quickAddButtons.map((amount) => (
            <button
              key={amount}
              onClick={() => onAdd(amount)}
              className="bg-card-hover hover:bg-border text-white py-3 px-4 rounded-xl font-medium transition-colors"
            >
              +{amount}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="flex gap-2">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter oz"
            className="flex-1 bg-card-hover border border-border rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary transition-colors"
            onKeyPress={(e) => e.key === 'Enter' && handleCustomAdd()}
          />
          <button
            onClick={handleCustomAdd}
            className="bg-primary hover:bg-primary-dark text-black p-3 rounded-xl transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hydration Tips */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-xl">💧</span> Hydration Tips
        </h3>
        <ul className="space-y-2 text-sm text-muted">
          <li>• Standard glass: ~8oz</li>
          <li>• Water bottle (small): ~16oz</li>
          <li>• Large water bottle: ~32oz</li>
          <li>• Aim for 100oz daily</li>
        </ul>
      </div>

      {/* Today's Log - Placeholder for now */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Today's Log</h3>
        <p className="text-center text-muted py-6">
          No entries yet. Start tracking your water intake!
        </p>
      </div>
    </div>
  );
};
