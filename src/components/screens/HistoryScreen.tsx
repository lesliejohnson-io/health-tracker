import { Calendar, Dumbbell, Droplet, Leaf } from 'lucide-react';

interface DailyData {
  date: string;
  proteinTotal: number;
  waterTotal: number;
  completedWorkout: { day: string; duration: string } | null;
  checkedIn: boolean;
}

interface HistoryScreenProps {
  history: DailyData[];
}

export const HistoryScreen = ({ history }: HistoryScreenProps) => {
  const sortedHistory = [...history].sort((a, b) => b.date.localeCompare(a.date));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">History</h1>
        <p className="text-muted">Your progress over time</p>
      </div>

      {sortedHistory.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 text-center">
          <Calendar className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-muted">No history yet. Start tracking!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedHistory.map((day) => (
            <div key={day.date} className="bg-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{formatDate(day.date)}</h3>
                  <p className="text-sm text-muted">{day.date}</p>
                </div>
                {day.checkedIn && (
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    Checked In
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Protein */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{day.proteinTotal}g</div>
                    <div className="text-xs text-muted">Protein</div>
                  </div>
                </div>

                {/* Water */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Droplet className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{day.waterTotal}oz</div>
                    <div className="text-xs text-muted">Water</div>
                  </div>
                </div>

                {/* Workout */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {day.completedWorkout ? '✓' : '—'}
                    </div>
                    <div className="text-xs text-muted">
                      {day.completedWorkout ? day.completedWorkout.day : 'No workout'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
