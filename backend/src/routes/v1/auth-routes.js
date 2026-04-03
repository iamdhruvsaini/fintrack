const router = require('express').Router();


router.post('/login', (req, res) => {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;
});


module.exports = router;