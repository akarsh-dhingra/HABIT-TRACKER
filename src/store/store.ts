// Store is basically a custom Hook in Zustand
import {create} from 'zustand'; 
import { createJSONStorage, devtools,persist } from 'zustand/middleware';

export interface Habit{
    id:string;
    name:string;
    frequency:"daily"|"weekly";
    completedDates:string[];
    createdAt:string;
}

interface HabitState{
    habits:Habit[];
    isloading:boolean;
    error:string|null;
    addhabit:(name:string,frequency:"daily"|"weekly")=>void;
    removeHabit:(id:string)=>void;
    toggleHabit:(id:string,date:string)=>void;
    fetchHabits:()=>Promise<void>;
}
const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set,get) => ({
        habits: [],
        isloading:false,
        error:null,
        addhabit: (name, frequency) =>
          set((state) => ({
            habits: [
              ...state.habits,
              {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          })),
        removeHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          })),
        toggleHabit: (id, date) =>
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id
                ? {
                    ...habit,
                    completedDates: habit.completedDates.includes(date)
                      ? habit.completedDates.filter((d) => d !== date)
                      : [...habit.completedDates, date],
                  }
                : habit
            ),
          })),
          fetchHabits:async()=>{
            set({isloading:true});
            try{
                const currHabits=get().habits;
                if(currHabits.length>0){
                    set({isloading:false});
                    return;
                }
                // await new Promise((resolve)=>setTimeout(resolve, 1000));
            const mockHabits: Habit[] = [
            {
              id: "1",
              name: "Read",
              frequency: "daily",
              completedDates: [],
              createdAt: new Date().toISOString(),
            },
            {
              id: "2",
              name: "Exercise",
              frequency: "daily",
              completedDates: [],
              createdAt: new Date().toISOString(),
            },
          ];
          set({habits:mockHabits,isloading:false});
            }catch(error){
             set({ error: "Failed to fetch habits", isloading: false });
            }
          }
      }),
      {
        name: "habit-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useHabitStore