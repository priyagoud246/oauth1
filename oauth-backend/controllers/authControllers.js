export const getMe = (req, res) => {
  console.log("🔍 Checking Auth Status. User ID:", req.user?.id || "None");

  // Passport adds isAuthenticated() to the request object
  if (req.isAuthenticated() && req.user) {
    return res.status(200).json({ 
      success: true, 
      user: req.user 
    });
  } else {
    return res.status(401).json({ 
      success: false, 
      message: "Not Authorized: No session found" 
    });
  }
};

export const logout = (req, res) => {
  // 1. Passport logout
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Could not log out" });
      }

      
      res.clearCookie("connect.sid", {
  path: "/",
  httpOnly: true,
  secure: true,   
  sameSite: "none" 
   });

      
      return res.status(200).json({ 
        success: true, 
        message: "Logged out successfully" 
      });
    });
  });
};