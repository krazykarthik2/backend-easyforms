const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
const formRoutes = require('./routes/formRoutes');
const errorHandler = require('./utils/errorHandler');
const connectDB = require('./config/db');
const authRoutes_admin = require('./routes/authRoutes_admin');
const authRoutes_user = require('./routes/authRoutes_user');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const respondRoutes = require('./routes/respondRoutes');
dotenv.config();
const app = express();

app.use(express.json({limit: '50mb'}));//temporary fix but need to restrict this to img routes later
app.use(cors());
connectDB();
// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/help.md');
});
app.use('/api/events', eventRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/respond', respondRoutes);
app.use('/api/auth/admin', authRoutes_admin);
app.use('/api/auth/user', authRoutes_user);
app.use('/api/accounts/users', userRoutes); 
app.use('/api/accounts/admins', adminRoutes);
// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
