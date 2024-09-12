const prisma = require("../prisma/prisma");

// Middleware to check if the user has ADMIN or TEACHER role
const checkRole = (roles) => {
  return async (req, res, next) => {
    const email = req.body.email;
    try {
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }
      const user = await prisma.users.findFirst({
        where: { email: email },
      });

      if (!user || !roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
};

module.exports = checkRole;
