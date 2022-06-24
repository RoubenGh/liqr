const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const db = require('../../db/models');
const { application } = require('express');

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
	'/:id(\\d+)',
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const image = await db.Image.findAll({
			where: { id },
			include: db.User,
		});
		return res.json(image);
	})
);

router.post(
	'/',
	validationErrors,
	asyncHandler(async (req, res) => {
		// console.log('here')
		const { title, content, userId, imageUrl } = req.body;
		// console.log('123123123123', req.body)
		const image = await db.Image.create({
			title,
			content,
			userId,
			imageUrl,
		});
		return res.json(image);
	})
);

router.put(
	'/:id(\\d+)',
	validationErrors,
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const { title, content, imageUrl } = req.body;
		const image = await db.Image.findByPk(id);
		if (!image) {
			return res.status(404).json({
				message: 'Image not found',
			});
		}
		await image.update({
			title,
			content,
			imageUrl,
		});
		return res.json(image);
	})
);

router.delete(
	'/:id(\\d+)',
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		const image = await db.Image.findByPk(id);
		if (!image) {
			return res.status(404).json({
				message: 'Image not found',
			});
		}
		await image.destroy();
		return res.json({ message: 'Image deleted' });
	})
);

module.exports = router;
