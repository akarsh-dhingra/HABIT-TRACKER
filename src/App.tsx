import  { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";
import useHabitStore from "./store/store";
function App() {
  const { fetchHabits } = useHabitStore();

  useEffect(() => {
    fetchHabits();
  }, []);
  return (
<Container>
<Box>
  <Typography variant='h3' component="h3" gutterBottom align='center'  >
Habit Tracker 
  </Typography>
  {/* form */}
  <AddHabitForm/>
  <HabitList/>
  {/* Lists of Habit */}
  {/* Stats */}

</Box>
</Container>
  )
  
};
export default App
