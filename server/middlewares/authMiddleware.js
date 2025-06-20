const User = require('../models/User');

// Protect routes using sessions
exports.protect = async (req, res, next) => {
  // Check if session exists and has userId
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized - please log in',
    });
  }

  try {
    // Attach user to request object
    req.user = await User.findById(req.session.userId);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists',
      });
    }
    
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Session invalid',
    });
  }
};
