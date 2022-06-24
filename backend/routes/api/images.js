const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const handleValidationErrors = require('../../utils/validation');

const db = require('../../db/models');

const validationErrors = [
	check('title')
		.exists({ checkNull: true })
		.withMessage('Title is required')
		.isLength({ min: 1, max: 75 })
		.withMessage('Title must be between 1 and 75 characters'),
	handleValidationErrors,
];

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const images = await db.Image.findAll();
		res.json(images);
	})
);

router.get(
	'/:id(\\d+)', asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const image = await db.Image.findAll({
			where: { id },
			include: User,
		});
		return res.json(image);
	})
);

// router.get('/image/:id/');


module.exports = router
