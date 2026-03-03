import express from "express";
import passport from "passport";
import { logout, getMe } from "../controllers/authControllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js"; 

const router = express.Router();

const CLIENT_URL = process.env.NODE_ENV === "production" 
    ? "https://oauth-fullstack.netlify.app" 
    : "http://localhost:5173";

router.get("/google", (req, res, next) => {
    console.log(" Incoming request to /auth/google...");
    next();
}, passport.authenticate("google", { 
    scope: ["profile", "email"],
    prompt: "select_account"
}));

router.get("/google/callback", (req, res, next) => {
    console.log("Google redirected back to callback...");
    next();
},
  passport.authenticate("google", { 
    failureRedirect: `${CLIENT_URL}/login`, 
    session: true 
  }),
  (req, res) => {
    console.log(" Auth Successful! Sending user to Dashboard.");
    res.redirect(`${CLIENT_URL}/dashboard`);
  }
);

router.get("/me", isAuthenticated, getMe);

router.get("/logout", logout);

export default router;