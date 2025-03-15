const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const dotenv = require('dotenv');
    const path = require('path');
    const userRoutes = require('./routes/users');
    const membershipRoutes = require('./routes/memberships');
    const attendanceRoutes = require('./routes/attendance');
    const paymentRoutes = require('./routes/payments');

    // Load environment variables
    dotenv.config();

    // Create Express app
    const app = express();

    // CORS configuration - Allow requests from your frontend origin
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:8080', 'http://localhost:5173']; // Add your frontend origin(s)

    app.use(cors({
      origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true, // Important for cookies, authorization headers with HTTPS
    }));

    // Handle preflight OPTIONS requests for all routes
    app.options('*', cors());


    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Serve uploads as static files
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Database connection
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rfid-daycare')
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('MongoDB connection error:', err));

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/memberships', membershipRoutes);
    app.use('/api/attendance', attendanceRoutes);
    app.use('/api/payments', paymentRoutes);

    // API health check
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', message: 'RFID Daycare API is running' });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong!', error: err.message });
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
