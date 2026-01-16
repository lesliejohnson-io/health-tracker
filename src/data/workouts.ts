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
    day: "Day 1",
    title: "Lower Body Strength (Legs + Glutes Priority)",
    duration: "50 min",
    calories: 420,
    sections: [
      {
        title: "Activation (5 min)",
        color: "text-primary",
        exercises: [
          {
            id: "d1-1",
            name: "Glute Bridges",
            sets: "2 sets",
            reps: "15"
          },
          {
            id: "d1-2",
            name: "Banded Clamshells",
            sets: "2 sets",
            reps: "12 each side"
          },
          {
            id: "d1-3",
            name: "Cat-Cow Stretches",
            sets: "10 reps"
          }
        ]
      },
      {
        title: "Main Workout",
        color: "text-primary",
        exercises: [
          {
            id: "d1-4",
            name: "Goblet Squats (quad focus)",
            sets: "4 sets",
            reps: "10-12",
            rest: "Hold dumbbell at chest, go deep"
          },
          {
            id: "d1-5",
            name: "Romanian Deadlifts (hamstring/glute focus)",
            sets: "4 sets",
            reps: "10-12",
            rest: "Dumbbells or barbell"
          },
          {
            id: "d1-6",
            name: "Bulgarian Split Squats (unilateral leg shaper)",
            sets: "3 sets",
            reps: "10 each leg",
            rest: "Back foot elevated on bench"
          },
          {
            id: "d1-7",
            name: "Hip Thrusts (glute builder)",
            sets: "3 sets",
            reps: "12-15",
            rest: "Shoulders on bench, barbell or dumbbell"
          },
          {
            id: "d1-8",
            name: "Walking Lunges (functional leg work)",
            sets: "3 sets",
            reps: "12 steps each leg",
            rest: "Bodyweight or light dumbbells"
          }
        ]
      },
      {
        title: "Finisher",
        color: "text-primary",
        exercises: [
          {
            id: "d1-9",
            name: "Plank Hold",
            sets: "3 sets",
            reps: "45-60 sec"
          }
        ]
      }
    ]
  },
  {
    day: "Day 2",
    title: "Upper Body + Core (Balance & Posture)",
    duration: "55 min",
    calories: 380,
    sections: [
      {
        title: "Mobility (5 min)",
        color: "text-primary",
        exercises: [
          {
            id: "d2-1",
            name: "Shoulder Circles",
            sets: "10 each direction"
          },
          {
            id: "d2-2",
            name: "Thread the Needle Stretches",
            sets: "5 each side"
          },
          {
            id: "d2-3",
            name: "Scapular Push-Ups",
            sets: "10 reps"
          }
        ]
      },
      {
        title: "Main Workout",
        color: "text-primary",
        exercises: [
          {
            id: "d2-4",
            name: "Dumbbell Bench Press or Push-Ups (chest)",
            sets: "4 sets",
            reps: "10-12",
            rest: "Counteracts forward shoulder slump"
          },
          {
            id: "d2-5",
            name: "Bent-Over Dumbbell Rows (back)",
            sets: "4 sets",
            reps: "12",
            rest: "Pulls shoulders back, fights computer posture"
          },
          {
            id: "d2-6",
            name: "Overhead Press (shoulders)",
            sets: "3 sets",
            reps: "10",
            rest: "Dumbbells or barbell"
          },
          {
            id: "d2-7",
            name: "Lat Pulldowns or Pull-Up Negatives (back width)",
            sets: "3 sets",
            reps: "10-12",
            rest: "V-taper, postural support"
          },
          {
            id: "d2-8",
            name: "Bicep Curls (arms)",
            sets: "3 sets",
            reps: "12",
            rest: "Aesthetic balance"
          },
          {
            id: "d2-9",
            name: "Tricep Dips or Overhead Extensions (arms)",
            sets: "3 sets",
            reps: "12",
            rest: "Arm definition"
          }
        ]
      },
      {
        title: "Core Finisher",
        color: "text-primary",
        exercises: [
          {
            id: "d2-10",
            name: "Dead Bugs",
            sets: "3 sets",
            reps: "12 each side"
          },
          {
            id: "d2-11",
            name: "Side Plank",
            sets: "2 sets",
            reps: "30 sec each side"
          }
        ]
      }
    ]
  },
  {
    day: "Day 3",
    title: "Full Body Power (Metabolic + Leg Emphasis)",
    duration: "60 min",
    calories: 480,
    sections: [
      {
        title: "Dynamic Warm-Up (5 min)",
        color: "text-primary",
        exercises: [
          {
            id: "d3-1",
            name: "Jumping Jacks",
            sets: "30 seconds"
          },
          {
            id: "d3-2",
            name: "Leg Swings",
            sets: "10 each direction"
          },
          {
            id: "d3-3",
            name: "Inchworms",
            sets: "5 reps"
          }
        ]
      },
      {
        title: "Circuit Style (3 Rounds)",
        color: "text-primary",
        exercises: [
          {
            id: "d3-4",
            name: "Trap Bar Deadlifts or Sumo Deadlifts",
            sets: "8-10 reps",
            rest: "Total body strength, major calorie burn"
          },
          {
            id: "d3-5",
            name: "Front Squats or Goblet Squats",
            sets: "10 reps",
            rest: "Leg building, core stability"
          },
          {
            id: "d3-6",
            name: "Step-Ups",
            sets: "10 reps each leg",
            rest: "Use bench/box, hold dumbbells"
          },
          {
            id: "d3-7",
            name: "Kettlebell Swings",
            sets: "15 reps",
            rest: "Hip drive, fat burning, glute activation"
          },
          {
            id: "d3-8",
            name: "Mountain Climbers",
            sets: "20 reps",
            rest: "10 each side • Rest 90 sec between rounds"
          }
        ]
      },
      {
        title: "Finisher",
        color: "text-primary",
        exercises: [
          {
            id: "d3-9",
            name: "Farmer's Carry",
            sets: "2 sets",
            reps: "40 sec",
            rest: "Heavy dumbbells"
          },
          {
            id: "d3-10",
            name: "Hollow Body Hold",
            sets: "2 sets",
            reps: "30 sec"
          }
        ]
      }
    ]
  }
];
