import express from "express";
import helmet from 'helmet'; 
const app = express()


const PORT = process.env.PORT || 8000;


// middleware 
app.use(helmet());




app.use("/", (req, res) => {

   res.json({message :" hellow world"  })

})


app.listen(PORT, (error) => {

    if (error) {
        console.log(error)

    }
    console.log(`Server is running at http://localhost:${PORT}`)

})