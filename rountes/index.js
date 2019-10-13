const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')

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