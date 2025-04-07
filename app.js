import express from "express";
import router  from "./routes/routes.js";

const app =express()

app.use(express.json())
app.use('/routes', router )

app.listen(3000, (req, res)=>{
    console.log(`server runs`)
})