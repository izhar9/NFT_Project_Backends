import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
})
// const app = express();

const port = process.env.PORT || 8000;
connectDB()
.then(() =>{
    app.on("error", (error) =>{
        console.error("Database connected but app is not listening: ",error)
        throw error
    });
    app.listen(port,() =>{
        console.log(`server is running on port ${port}`)
    })
})
.catch((error) =>{
    console.log(`MongoBD connection field !! ${error}`)
})