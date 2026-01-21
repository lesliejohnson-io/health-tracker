import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { BottomNav } from './components/BottomNav';
import { CheckInScreen } from './components/screens/CheckInScreen';
import { WorkoutsScreen, type WorkoutLog } from './components/screens/WorkoutsScreen';
import { ProteinScreen } from './components/screens/ProteinScreen';
import { WaterScreen } from './components/screens/WaterScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { useLocalStorage, getTodayKey } from './hooks/useLocalStorage';

interface DailyData {
  date: string;
  proteinTotal: number;
  waterTotal: number;
  completedWorkout: { day: string; duration: string } | null;
  checkedIn: boolean;
  mood: number | null;
  energy: 'Low' | 'Medium' | 'High' | null;
  sleep: string;
  otherWorkout: string;
  notes: string;
  workoutLog?: WorkoutLog;
}

const getEmptyDailyData = (): DailyData => ({
  date: getTodayKey(),
  proteinTotal: 0,
  waterTotal: 0,
  completedWorkout: null,
  checkedIn: false,
  mood: null,
  energy: null,
  sleep: '',
  otherWorkout: '',
  notes: '',
});

function App() {
  const [activeTab, setActiveTab] = useState('checkin');
  const [dailyData, setDailyData] = useLocalStorage<DailyData>(
    'healthCoach_dailyData',
    getEmptyDailyData()
  );
  const [history, setHistory] = useLocalStorage<DailyData[]>('healthCoach_history', []);
  const [workoutLogs, setWorkoutLogs] = useLocalStorage<WorkoutLog[]>('healthCoach_workoutLogs', []);

  // Save to history and reset daily data if it's a new day
  useEffect(() => {
    const today = getTodayKey();
    if (dailyData.date !== today) {
      // Save previous day to history if it has any data
      if (
        dailyData.proteinTotal > 0 ||
        dailyData.waterTotal > 0 ||
        dailyData.completedWorkout ||
        dailyData.checkedIn
      ) {
        setHistory((prev) => {
          const existing = prev.find((d) => d.date === dailyData.date);
          if (existing) {
            return prev.map((d) => (d.date === dailyData.date ? dailyData : d));
          }
          return [...prev, dailyData].slice(-30); // Keep last 30 days
        });
      }
      setDailyData(getEmptyDailyData());
    }
  }, [dailyData, setDailyData, setHistory]);

  const handleAddProtein = (amount: number) => {
    setDailyData((prev) => ({ ...prev, proteinTotal: prev.proteinTotal + amount }));
    toast.success(`Added ${amount}g protein`);
  };

  const handleAddWater = (amount: number) => {
    setDailyData((prev) => ({ ...prev, waterTotal: prev.waterTotal + amount }));
    toast.success(`Added ${amount}oz water`);
  };

  const handleUpdateCheckInData = useCallback((checkInData: {
    mood: number | null;
    energy: 'Low' | 'Medium' | 'High' | null;
    sleep: string;
    otherWorkout: string;
    notes: string;
  }) => {
    setDailyData((prev) => ({
      ...prev,
      mood: checkInData.mood,
      energy: checkInData.energy,
      sleep: checkInData.sleep,
      otherWorkout: checkInData.otherWorkout,
      notes: checkInData.notes,
    }));
  }, [setDailyData]);

  const handleCheckIn = useCallback(() => {
    setDailyData((prev) => ({ ...prev, checkedIn: true }));
    toast.success('Check-in complete!');
  }, [setDailyData]);

  const handleWorkoutComplete = (log: WorkoutLog) => {
    setDailyData((prev) => ({
      ...prev,
      completedWorkout: { day: log.day, duration: log.duration },
      workoutLog: log
    }));

    // Save to workout logs (keep last 30 logs per workout type)
    setWorkoutLogs((prev) => {
      const updated = [...prev, log];
      // Keep only the most recent logs (max 90 total to cover ~30 per workout type)
      return updated.slice(-90);
    });

    const mins = Math.floor(log.elapsedSeconds / 60);
    const secs = log.elapsedSeconds % 60;
    toast.success(`${log.day} completed in ${mins}:${secs.toString().padStart(2, '0')}`);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'checkin':
        return (
          <CheckInScreen
            proteinTotal={dailyData.proteinTotal}
            waterTotal={dailyData.waterTotal}
            completedWorkout={dailyData.completedWorkout}
            checkInData={{
              mood: dailyData.mood,
              energy: dailyData.energy,
              sleep: dailyData.sleep,
              otherWorkout: dailyData.otherWorkout,
              notes: dailyData.notes,
            }}
            onUpdateCheckInData={handleUpdateCheckInData}
            onCheckIn={handleCheckIn}
            onNavigate={setActiveTab}
          />
        );
      case 'workouts':
        return <WorkoutsScreen onWorkoutComplete={handleWorkoutComplete} lastWorkoutLogs={workoutLogs} />;
      case 'protein':
        return <ProteinScreen total={dailyData.proteinTotal} onAdd={handleAddProtein} />;
      case 'water':
        return <WaterScreen total={dailyData.waterTotal} onAdd={handleAddWater} />;
      case 'history':
        // Include today's data in history view
        const allHistory =
          dailyData.proteinTotal > 0 ||
          dailyData.waterTotal > 0 ||
          dailyData.completedWorkout ||
          dailyData.checkedIn
            ? [...history.filter((h) => h.date !== dailyData.date), dailyData]
            : history;
        return <HistoryScreen history={allHistory} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" theme="dark" />

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
