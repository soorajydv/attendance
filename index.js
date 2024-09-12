const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const attendanceRoutes = require('./routes/attendance')
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// app.use('/',(req,res)=>{
//     res.send("Hello world")
// })

app.post('/test', (req, res) => {
    console.log('Received request body:', req.body);
    res.status(200).json({ message: 'Test endpoint works!' });
  });
  

app.use('/attendance',attendanceRoutes)
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
