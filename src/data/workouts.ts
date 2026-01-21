export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps?: string;
  rest?: string;
}

export interface WorkoutSection {
  title: string;
  color: string;
  exercises: Exercise[];
}

export interface Workout {
  day: string;
  title: string;
  duration: string;
  calories: number;
  sections: WorkoutSection[];
}

export const workouts: Workout[] = [
  {
    day: "Workout A",
    title: "Push Dominant",
    duration: "30-35 min",
    calories: 350,
    sections: [
      {
        title: "Exercises",
        color: "text-primary",
        exercises: [
          {
            id: "a-1",
            name: "Barbell Back Squat",
            sets: "2 sets",
            reps: "5-6",
            rest: "RPE 9"
          },
          {
            id: "a-2",
            name: "Incline Barbell Bench Press",
            sets: "2 sets",
            reps: "6-8",
            rest: "RPE 9"
          },
          {
            id: "a-3",
            name: "Romanian Deadlift",
            sets: "2 sets",
            reps: "6-8",
            rest: "RPE 8-9"
          },
          {
            id: "a-4",
            name: "Overhead Press",
            sets: "2 sets",
            reps: "6-8",
            rest: "RPE 9"
          },
          {
            id: "a-5",
            name: "Dumbbell Bulgarian Split Squat",
            sets: "2 sets",
            reps: "8-10 per leg",
            rest: "RPE 8"
          },
          {
            id: "a-6",
            name: "Weighted Dips",
            sets: "2 sets",
            reps: "8-12",
            rest: "RPE 9"
          },
          {
            id: "a-7",
            name: "Cable Tricep Pushdowns",
            sets: "2 sets",
            reps: "10-12",
            rest: "RPE 9"
          },
          {
            id: "a-8",
            name: "Standing Calf Raises",
            sets: "2 sets",
            reps: "12-15",
            rest: "RPE 9"
          },
          {
            id: "a-9",
            name: "Plank Hold",
            sets: "2 sets",
            reps: "45-60 sec"
          }
        ]
      }
    ]
  },
  {
    day: "Workout B",
    title: "Pull Dominant",
    duration: "30-35 min",
    calories: 340,
    sections: [
      {
        title: "Exercises",
        color: "text-primary",
        exercises: [
          {
            id: "b-1",
            name: "Conventional Deadlift",
            sets: "2 sets",
            reps: "5",
            rest: "RPE 9"
          },
          {
            id: "b-2",
            name: "Weighted Pull-ups",
            sets: "2 sets",
            reps: "6-8",
            rest: "RPE 9"
          },
          {
            id: "b-3",
            name: "Front Squat",
            sets: "2 sets",
            reps: "6-8",
            rest: "RPE 8-9"
          },
          {
            id: "b-4",
            name: "Barbell Bent-Over Row",
            sets: "2 sets",
            reps: "6-8",
            rest: "RPE 9"
          },
          {
            id: "b-5",
            name: "Walking Lunges",
            sets: "2 sets",
            reps: "10 per leg",
            rest: "RPE 8"
          },
          {
            id: "b-6",
            name: "Chest-Supported Dumbbell Row",
            sets: "2 sets",
            reps: "8-10",
            rest: "RPE 9"
          },
          {
            id: "b-7",
            name: "Barbell Bicep Curl",
            sets: "2 sets",
            reps: "8-10",
            rest: "RPE 9"
          },
          {
            id: "b-8",
            name: "Face Pulls",
            sets: "2 sets",
            reps: "15-20",
            rest: "RPE 8"
          },
          {
            id: "b-9",
            name: "Hanging Leg Raises",
            sets: "2 sets",
            reps: "10-15"
          }
        ]
      }
    ]
  },
  {
    day: "Workout C",
    title: "Leg & Power Focus",
    duration: "35-40 min",
    calories: 400,
    sections: [
      {
        title: "Exercises",
        color: "text-primary",
        exercises: [
          {
            id: "c-1",
            name: "Trap Bar Deadlift",
            sets: "2 sets",
            reps: "5-6",
            rest: "RPE 9"
          },
          {
            id: "c-2",
            name: "Barbell Hip Thrust",
            sets: "2 sets",
            reps: "8-10",
            rest: "RPE 9"
          },
          {
            id: "c-3",
            name: "Flat Barbell Bench Press",
            sets: "2 sets",
            reps: "6-8",
            rest: "RPE 9"
          },
          {
            id: "c-4",
            name: "Goblet Squat",
            sets: "2 sets",
            reps: "10-12",
            rest: "RPE 8-9"
          },
          {
            id: "c-5",
            name: "Pendlay Row",
            sets: "2 sets",
            reps: "6-8",
            rest: "RPE 9"
          },
          {
            id: "c-6",
            name: "Leg Press",
            sets: "2 sets",
            reps: "10-12",
            rest: "RPE 9"
          },
          {
            id: "c-7",
            name: "Hammer Curls",
            sets: "2 sets",
            reps: "10-12",
            rest: "RPE 8"
          },
          {
            id: "c-8",
            name: "Lateral Raises",
            sets: "2 sets",
            reps: "12-15",
            rest: "RPE 8-9"
          },
          {
            id: "c-9",
            name: "Ab Wheel Rollouts",
            sets: "2 sets",
            reps: "8-12"
          }
        ]
      }
    ]
  }
];
