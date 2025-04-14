const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const studentRoutes = require('./routes/students');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working 🔥');
});

app.use('/api/projects', projectRoutes);

app.use('/api/students', studentRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected ✅'))
.catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
