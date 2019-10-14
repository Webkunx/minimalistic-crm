const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')

// mid for access for auth pages
router.use('/dashboard', ensureAuthenticated);

router.get('/', (req, res)=>{
    res.render('welcome');
});

router.get('/dashboard', (req, res)=>{
    res.render('dashboard',{
        name: req.user.name
    });
});

module.exports = router;