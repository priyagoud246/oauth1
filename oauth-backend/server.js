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

// Use a cleaner CORS setup for production
const allowedOrigins = [
  "http://localhost:5173", 
  "https://oauth-fullstack.netlify.app" 
];

app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
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

// Essential for Render/Heroku/Vercel proxies
app.set("trust proxy", 1); 

// Fixed Session Logic
app.use(session({
  secret: process.env.SESSION_SECRET || "priyanka_secure_67",
  resave: false,
  saveUninitialized: false, 
  proxy: true,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    stringify: false, // Ensures session data is stored as a clean object
    ttl: 14 * 24 * 60 * 60 
  }),
  cookie: {
    secure: true, // Must be true for HTTPS on Render
    httpOnly: true,
    sameSite: "none", // Critical for Cross-Site (Netlify to Render)
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("🚀 Priyanka's OAuth Server is live!");
});

app.use("/auth", authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas (oauth_db)"))
  .catch(err => console.error("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));