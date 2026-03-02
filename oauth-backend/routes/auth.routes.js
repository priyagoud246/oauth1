import express from "express";
import passport from "passport";
import { logout, getMe } from "../controllers/authControllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js"; 

const router = express.Router();

// 1. Initial Google Authentication
router.get("/google", (req, res, next) => {
    // This will show in your terminal when you click the button
    console.log("🚀 Incoming request to /auth/google...");
    next();
}, passport.authenticate("google", { 
    scope: ["profile", "email"],
    prompt: "select_account" // Forces the account selector to appear
}));

// 2. Google Callback
router.get("/google/callback", (req, res, next) => {
    console.log("🔄 Google redirected back to callback...");
    next();
},
  passport.authenticate("google", { 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login`, 
    session: true 
  }),
  (req, res) => {
    console.log("✅ Auth Successful! Sending user to Dashboard.");
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard`);
  }
);

router.get("/me", isAuthenticated, getMe);

router.get("/logout", logout);

export default router;