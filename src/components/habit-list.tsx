import {Box,Button,Grid,LinearProgress,Paper, Typography} from "@mui/material";
import useHabitStore, { type Habit } from "../store/store";
import  CheckCircleIcon  from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function HabitList(){
    const {habits,removeHabit,toggleHabit,}= useHabitStore();
    const today=new Date().toISOString().split("T")[0];

    const getstreak=(habit:Habit)=>{
        let streak=0;
        const currentdate=new Date();
        //  will generate a new Date
        while(true){
            const dateString=currentdate.toISOString().split("T")[0];
            if(habit.completedDates.includes(dateString)){
                streak++;
                currentdate.setDate(currentdate.getDate()-1);
            }
            else{
                break;
            }
            return streak;
        }
    }

    return (
        <Box sx={{display:"flex",flexDirection:"column",gap:2,mt:4 }} >   
        {habits.map((habit)=>{
      return <Paper key={habit.id} elevation={2} sx={{p:2}} >
        <Grid  container alignItems="center" justifyContent="space-between" >
           <Grid item xs={12} sm={6}>
                <Typography variant="h6">{habit.name}
                    <Typography variant="body2" color="text.secondary" >{habit.frequency}</Typography>
                </Typography>
            </Grid>
         <Grid item >
            <Box sx={{display:"flex",gap:1,ml:"auto",flexWrap:"wrap"}} >
                <Button variant="contained" 
                color={habit.completedDates.includes(today)?"success":"primary"}
                startIcon={<CheckCircleIcon/>}
                onClick={()=>toggleHabit(habit.id,today)}
                 >{habit.completedDates.includes(today)?"Completed":"Mark as Completed"}</Button>
                 <Button variant="contained" 
                 color="error" 
                 startIcon={<DeleteIcon/>}
                 onClick={()=>removeHabit(habit.id)}>Delete Habit</Button>
            </Box>
         </Grid>
        </Grid>
        <Box sx={{mt:2}} >
<Typography variant="body2" gutterBottom>
  🔥 Streak: {getstreak(habit)} day{getstreak(habit) !== 1 ? "s" : ""}
</Typography>
<LinearProgress
  variant="determinate"
  value={Math.min(getstreak(habit) * 10, 100)}
  sx={{
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    "& .MuiLinearProgress-bar": {
      backgroundColor: getstreak(habit) > 3 ? "#2e7d32" : "#0288d1",
    },
  }}
/>
        </Box>
        </Paper>
           })}
        </Box>
    )
}