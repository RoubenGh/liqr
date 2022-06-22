// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.post('/test', (req, res) => {
	res.json({ requestBody: req.body });
});

module.exports = router;
