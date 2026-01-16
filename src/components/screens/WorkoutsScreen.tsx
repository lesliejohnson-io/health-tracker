import { Dumbbell, Clock, Flame } from 'lucide-react';
import { useState } from 'react';
import { workouts } from '../../data/workouts';
import { cn } from '../../utils/cn';

interface WorkoutsScreenProps {
  onWorkoutComplete: (day: string, duration: string) => void;
}

export const WorkoutsScreen = ({ onWorkoutComplete }: WorkoutsScreenProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const currentWorkout = workouts[selectedDay];

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
            onClick={() => setSelectedDay(index)}
            className={cn(
              'py-3 px-4 rounded-xl font-medium transition-colors',
              selectedDay === index
                ? 'bg-primary text-black'
                : 'bg-card hover:bg-card-hover text-white'
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

        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Progress</span>
          <span className="font-medium">0/{currentWorkout.sections.reduce((acc, s) => acc + s.exercises.length, 0)}</span>
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
                  className="bg-card hover:bg-card-hover rounded-xl p-4 transition-colors cursor-pointer"
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Start Workout Button */}
      <button
        onClick={() => onWorkoutComplete(currentWorkout.day, currentWorkout.duration)}
        className="w-full bg-primary hover:bg-primary-dark text-black py-4 rounded-xl font-semibold transition-colors"
      >
        Start Workout
      </button>
    </div>
  );
};
