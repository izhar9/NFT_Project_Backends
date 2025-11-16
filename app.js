import express from 'express';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
import UserData from './models/UserData.js'

const app = express();

// use() sabhi middleware and configuration ke liye use karte hai.
app.use(cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true // cookies / auth headers frontend se bhejne ke liye
}))

app.use(express.json({limit: "16kb"}))  // it receive json data Atmost 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"})) // it encode url params data 
app.use(express.static("public"))  // it store static data like image favicon
// app.use(cookieParser());

app.post("/api/userData", async (req, res) => {
  try {
    const { name, contact, age } = req.body;

    if (!name || !contact || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = new UserData({ name, contact, age });
    await user.save();

    res.json({ success: true, message: "User Data saved successfully", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Fetch All Users
app.get("/api/userData", async (req, res) => {
  try {
    const users = await UserData.find().sort({ createdAt: -1 });
    const count = await UserData.countDocuments();
    res.json(users,count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { app }