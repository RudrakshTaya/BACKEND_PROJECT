import express from 'express';  
const app = express();
const PORT = 4000;  
import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})
import connectDB from './src/Database/db.js';
app.get('/', (req, res) => {
    res.send("hello");
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
connectDB();