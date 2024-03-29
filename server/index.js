import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import dotenv from "dotenv";
import path from "path"

dotenv.config();
const app=express();
app.use(express.json({limit:'30mb',extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors()); 
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
});
app.get('/',(req,res)=>{
    res.send("this is a stackoverflow clone")
})

app.use('/user',userRoutes);
app.use('/questions',questionRoutes);

app.use("/answer", answerRoutes);


const PORT=process.env.PORT || 5000
const CONNECTION_URL=process.env.CONNECTION_URL
mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
.catch((err)=>console.log(err.message))   