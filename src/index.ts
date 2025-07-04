import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute"
import orderRoute from "./routes/OrderRoute"
import { v2 as cloudinary } from "cloudinary";

mongoose.connect(process.env.MONGODB_URI as string)
.then(() => console.log("Connected to mongodb!"))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();

app.use(cors())

app.use("/api/order/checkout/webhook", express.raw({type: "*/*"}));

app.use(express.json())
app.get("/health", async(req: Request, res: Response) =>{
    res.send({ message: "Good to see you!"})
})

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);


app.listen(5000, () => {
    console.log("server is running on localhost:5000");
});


