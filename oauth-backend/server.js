import dotenv from "dotenv"; 
dotenv.config(); 

import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

import "./config/passport.js"; 
import authRoutes from "./routes/auth.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174", 
  "https://oauth-fullstack.netlify.app" 
];

app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.set("trust proxy", 1); 

app.use(session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: false, 
  proxy: true,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions' 
  }),
  cookie: {
    secure: true, 
    httpOnly: true,
    sameSite: "none", 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("🚀 Priyanka's OAuth Server is live and running!");
});

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to Priyanka's MongoDB (oauth_db)"))
  .catch(err => console.error(" DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));