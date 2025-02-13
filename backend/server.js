require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const buspassRoutes = require('./routes/busRoutes');

const app = express();
const corsOptions = {
  origin: '*', // Allow all origins (or replace '*' with your frontend URL)
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));  // Allow JSON payloads up to 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Allow form data


// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Database Connection Error:", err));

app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/buspass', buspassRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
