import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { MessageEvent } from "http";

mongoose.connect(process.env.MONGODB_URI as string)
.then(() => console.log("Connected to mongodb!"))

const app = express();
app.use(express.json())
app.use(cors())

app.get("/health", async(req: Request, res: Response) =>{
    res.send({ message: "Good to see you!"})
})

app.use("/api/my/user", myUserRoute);


app.listen(5000, () => {
    console.log("server is running on localhost:5000");
});


