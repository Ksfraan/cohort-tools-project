const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middlieware');

router.get('/api/user/:id', isAuthenticated, async (req, res) => {
    try {
        const oneUser = await User.findById(req.params.id);
        res.json(oneUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
