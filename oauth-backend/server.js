import dotenv from "dotenv"; 
dotenv.config(); 

import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

// 1. IMPORT PASSPORT CONFIG FIRST
import "./config/passport.js"; 
// 2. IMPORT ROUTES
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors({ 
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// 3. SESSION MUST BE BEFORE PASSPORT.SESSION
app.use(session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: false, 
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions' 
  }),
  cookie: {
    secure: false, 
    httpOnly: true,
    sameSite: "lax", 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("🚀 Priyanka's OAuth Server is live and running!");
});

// 4. ATTACH ROUTES
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to Priyanka's MongoDB (oauth_db)"))
  .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));