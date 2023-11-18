import express from 'express';

const app = express();

app.get('/', async (req, res) => {
    res.send("OK")
});

app.listen(8000, ()=>{
    console.log("Server running");
    
});