const express = require('express');
    const router = express.Router();
    const { User, Member, Admin } = require('../models/User');

    // @route   GET api/users/members
    // @desc    Get all members
    // @access  Public (No auth required)
    router.get('/members', async (req, res) => {
      try {
        const members = await Member.find().select('-password');
        res.json(members);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    });

    // No auth middleware here
    router.post('/members', async (req, res) => {
      // ... (rest of your member creation logic) ...
       const { email, password, name, rfidNumber, membershipHours, isActive } = req.body;
        try {
        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }
        const member = new Member({
          email,
          password,
          name,
          role: 'member',
          rfidNumber,
          membershipHours: membershipHours || 0,
          totalHoursUsed: 0,
          isActive: isActive !== undefined ? isActive : true
        });

        await member.save();
        res.status(201).json({msg: "member created", member})

      }
      catch(err){
        console.error(err);
        res.status(500).json({msg: err.message})
      }
    });

    // No auth middleware here
    router.post('/admins', async (req, res) => {
      // ... (rest of your admin creation logic) ...
      const { email, password, name, position } = req.body; // Added position

      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'Admin already exists' });
        }

        const admin = new Admin({
          email,
          password,
          name,
          role: 'admin',
          position, // Include position
        });

        await admin.save();
        res.status(201).json({ msg: 'Admin created successfully', admin: { ...admin.toObject(), password: undefined } });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    });

    module.exports = router;
