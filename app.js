import dotenv from "dotenv"
dotenv.config();
import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
const app = express()


const PORT = process.env.PORT || 8000;

// connect mongo db
import mongoClient  from "./db.js"; 
mongoClient();


// middleware 
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.urlencoded())
app.use(express.json())

import userRouter from "./routers/userRouter.js";
app.use("/api/v1/user" , userRouter)

app.use("/", (req, res) => {

   res.json({message :" hellow world"  })

})


app.listen(PORT, (error) => {

    if (error) {
        console.log(error)

    }
    console.log(`Server is running at http://localhost:${PORT}`)

})