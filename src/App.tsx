import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { BottomNav } from './components/BottomNav';
import { CheckInScreen } from './components/screens/CheckInScreen';
import { WorkoutsScreen } from './components/screens/WorkoutsScreen';
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
}

const getEmptyDailyData = (): DailyData => ({
  date: getTodayKey(),
  proteinTotal: 0,
  waterTotal: 0,
  completedWorkout: null,
  checkedIn: false,
});

function App() {
  const [activeTab, setActiveTab] = useState('checkin');
  const [dailyData, setDailyData] = useLocalStorage<DailyData>(
    'healthCoach_dailyData',
    getEmptyDailyData()
  );
  const [history, setHistory] = useLocalStorage<DailyData[]>('healthCoach_history', []);

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

  const handleCheckIn = () => {
    setDailyData((prev) => ({ ...prev, checkedIn: true }));
    toast.success('Check-in complete!');
  };

  const handleWorkoutComplete = (day: string, duration: string) => {
    setDailyData((prev) => ({ ...prev, completedWorkout: { day, duration } }));
    toast.success(`Workout logged: ${day}`);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'checkin':
        return (
          <CheckInScreen
            proteinTotal={dailyData.proteinTotal}
            waterTotal={dailyData.waterTotal}
            completedWorkout={dailyData.completedWorkout}
            onCheckIn={handleCheckIn}
            onNavigate={setActiveTab}
          />
        );
      case 'workouts':
        return <WorkoutsScreen onWorkoutComplete={handleWorkoutComplete} />;
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
