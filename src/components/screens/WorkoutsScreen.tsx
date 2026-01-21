import { Dumbbell, Clock, Flame, Play, Square } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { workouts } from '../../data/workouts';
import { cn } from '../../utils/cn';

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  weight: number | null;
}

export interface WorkoutLog {
  day: string;
  duration: string;
  elapsedSeconds: number;
  exercises: ExerciseLog[];
  completedAt: string;
}

interface WorkoutsScreenProps {
  onWorkoutComplete: (log: WorkoutLog) => void;
  lastWorkoutLogs: WorkoutLog[];
  todayWorkoutLog?: WorkoutLog;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const WorkoutsScreen = ({ onWorkoutComplete, lastWorkoutLogs, todayWorkoutLog }: WorkoutsScreenProps) => {
  // Auto-select the workout day if one was completed today
  const getInitialDay = () => {
    if (todayWorkoutLog) {
      const index = workouts.findIndex(w => w.day === todayWorkoutLog.day);
      return index >= 0 ? index : 0;
    }
    return 0;
  };

  const [selectedDay, setSelectedDay] = useState(getInitialDay);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [weights, setWeights] = useState<Record<string, string>>({});
  const timerRef = useRef<number | null>(null);

  const currentWorkout = workouts[selectedDay];

  // Check if current workout was completed today
  const isTodayWorkout = todayWorkoutLog?.day === currentWorkout.day;

  // Get today's weights for display
  const todayWeights: Record<string, number> = {};
  if (isTodayWorkout && todayWorkoutLog) {
    todayWorkoutLog.exercises.forEach(ex => {
      if (ex.weight !== null) {
        todayWeights[ex.exerciseId] = ex.weight;
      }
    });
  }

  // Find last log for current workout type (excluding today's)
  const lastLog = lastWorkoutLogs.find(log => log.day === currentWorkout.day && log.completedAt !== todayWorkoutLog?.completedAt);
  const lastWeights: Record<string, number> = {};
  if (lastLog) {
    lastLog.exercises.forEach(ex => {
      if (ex.weight !== null) {
        lastWeights[ex.exerciseId] = ex.weight;
      }
    });
  }

  // Timer effect
  useEffect(() => {
    if (isWorkoutActive) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isWorkoutActive]);

  const handleStartWorkout = () => {
    setIsWorkoutActive(true);
    setElapsedSeconds(0);
    // Prefill weights from today's completed workout if exists
    if (isTodayWorkout && todayWorkoutLog) {
      const prefilled: Record<string, string> = {};
      todayWorkoutLog.exercises.forEach(ex => {
        if (ex.weight !== null) {
          prefilled[ex.exerciseId] = ex.weight.toString();
        }
      });
      setWeights(prefilled);
    } else {
      setWeights({});
    }
  };

  const handleEndWorkout = () => {
    setIsWorkoutActive(false);

    // Collect all exercise data
    const exercises: ExerciseLog[] = [];
    currentWorkout.sections.forEach(section => {
      section.exercises.forEach(exercise => {
        const weightValue = weights[exercise.id];
        exercises.push({
          exerciseId: exercise.id,
          exerciseName: exercise.name,
          weight: weightValue ? parseFloat(weightValue) : null,
        });
      });
    });

    const log: WorkoutLog = {
      day: currentWorkout.day,
      duration: currentWorkout.duration,
      elapsedSeconds,
      exercises,
      completedAt: new Date().toISOString(),
    };

    onWorkoutComplete(log);
    setElapsedSeconds(0);
    setWeights({});
  };

  const handleWeightChange = (exerciseId: string, value: string) => {
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setWeights(prev => ({ ...prev, [exerciseId]: value }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Workouts</h1>
        <p className="text-muted">Your training split</p>
      </div>

      {/* Day Selector */}
      <div className="grid grid-cols-3 gap-3">
        {workouts.map((workout, index) => (
          <button
            key={workout.day}
            onClick={() => !isWorkoutActive && setSelectedDay(index)}
            disabled={isWorkoutActive}
            className={cn(
              'py-3 px-4 rounded-xl font-medium transition-colors',
              selectedDay === index
                ? 'bg-primary text-black'
                : 'bg-card hover:bg-card-hover text-white',
              isWorkoutActive && selectedDay !== index && 'opacity-50 cursor-not-allowed'
            )}
          >
            {workout.day}
          </button>
        ))}
      </div>

      {/* Workout Info Card */}
      <div className="bg-card rounded-2xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <Dumbbell className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{currentWorkout.title}</h2>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentWorkout.duration}
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {currentWorkout.calories} cal
              </span>
            </div>
          </div>
        </div>

        {/* Timer Display (when active) */}
        {isWorkoutActive && (
          <div className="bg-primary/10 rounded-xl p-4 text-center">
            <p className="text-sm text-muted mb-1">Elapsed Time</p>
            <p className="text-3xl font-bold text-primary font-mono">{formatTime(elapsedSeconds)}</p>
          </div>
        )}

        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Exercises</span>
          <span className="font-medium">{currentWorkout.sections.reduce((acc, s) => acc + s.exercises.length, 0)} total</span>
        </div>
      </div>

      {/* Exercise Sections */}
      <div className="space-y-6">
        {currentWorkout.sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className={cn('font-semibold mb-3', section.color)}>
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.exercises.map((exercise, exerciseIndex) => (
                <div
                  key={exercise.id}
                  className="bg-card rounded-xl p-4 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-card-hover rounded-lg flex items-center justify-center flex-shrink-0 text-muted font-medium">
                      {sectionIndex * 10 + exerciseIndex + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{exercise.name}</h4>
                      <p className="text-sm text-muted">
                        {exercise.sets}
                        {exercise.reps && ` × ${exercise.reps}`}
                        {exercise.rest && ` • ${exercise.rest}`}
                      </p>

                      {/* Weight Input (when workout is active) */}
                      {isWorkoutActive && (
                        <div className="mt-3 flex items-center gap-3">
                          {lastWeights[exercise.id] !== undefined && (
                            <span className="text-sm text-muted">
                              Last: <span className="text-primary font-medium">{lastWeights[exercise.id]} lbs</span>
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              inputMode="decimal"
                              placeholder="Weight"
                              value={weights[exercise.id] || ''}
                              onChange={(e) => handleWeightChange(exercise.id, e.target.value)}
                              className="w-20 bg-background border border-border rounded-lg px-3 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-primary"
                            />
                            <span className="text-sm text-muted">lbs</span>
                          </div>
                        </div>
                      )}

                      {/* Display today's logged weight (when not active) */}
                      {!isWorkoutActive && isTodayWorkout && todayWeights[exercise.id] !== undefined && (
                        <div className="mt-2">
                          <span className="text-sm text-green-400 font-medium">
                            Today: {todayWeights[exercise.id]} lbs
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Start/End Workout Button */}
      {isWorkoutActive ? (
        <button
          onClick={handleEndWorkout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Square className="w-5 h-5" />
          End Workout
        </button>
      ) : (
        <button
          onClick={handleStartWorkout}
          className="w-full bg-primary hover:bg-primary-dark text-black py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Start Workout
        </button>
      )}
    </div>
  );
};
