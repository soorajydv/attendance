const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const prisma = require('../prisma/prisma');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

function generateInstId() {
  const uuid = uuidv4();
  const instId = uuid.replace(/[^0-9a-z]/gi, '').substring(0, 4);
  return instId.toUpperCase();
}

class AuthController {
  async signup(req, res) {
    const { username, email, password, cpassword, role, roll_no } = req.body;
    console.log(req.body);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (password !== cpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { email: email },
            { username: username }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email or username or roll number' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      if (role == "STUDENT") {
        const newUser = await prisma.users.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
            roll_no: roll_no
          }
        });
        return res.status(201).json({ message: 'User registered successfully', user: newUser });

      } else {
        const instId = generateInstId();
        const newUser = await prisma.users.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
            role: "TEACHER",
            inst_id: instId
          }
        });
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async login(req, res) {

    const { email, password } = req.body
    console.log(req.body);


    try {
      
      const user = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) return res.status(400).json({ message: "Email doesn't exist" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(400).json({ message: 'Wrong Password' });

      // Generate JWT token
      jwt.sign(
        { email:user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
          if (err) {
            console.error('Error generating token:', err);
            return res.status(500).json({ message: 'Failed to generate token' });
          }

          const userData = {
            username: user.username,
            email: user.email,
            role: user.role,
          };

          console.log("Token: ", token);
          res.status(200).json({ message: "Login Success",userData,token })
        }
      )
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new AuthController();
