import { TextField,Box,FormControl,InputLabel,Select, MenuItem, Button } from "@mui/material";
import React,{useState} from "react";
import useHabitStore from "../store/store";


export default function AddHabitForm(){
    const [name,setname]=useState("");
    const [freq,setfreq]=useState<"daily"|"weekly">("daily");
    const {habits,addhabit}=useHabitStore();
    console.log(habits);
    const handlesubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        if(name.trimEnd()){
            addhabit(name,freq);
            setname("");
        }

    }
    return(
        <form onSubmit={handlesubmit}>
        <Box sx={{
            display:'flex',
            flexDirection:"column",
            gap:2
            }} >
            <TextField 
            label="Habit name"
            value={name}
            onChange={(e)=>setname(e.target.value as string)}
            placeholder="Enter habit name"
            fullWidth 
             />
    <FormControl  fullWidth>

  <InputLabel>Frequency</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={freq}
    label="Frequency " 
    onChange={(e)=>setfreq(e.target.value as "daily"|"weekly")}
  >
    <MenuItem value="Daily">Daily</MenuItem>
    <MenuItem value="Weekly">Weekly</MenuItem>
  </Select>
</FormControl>
<Button type="submit" variant="contained" color="primary" >Add Habit</Button>
        </Box>
        </form>      
    )
}