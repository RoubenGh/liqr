const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const db = require('../../db/models');

const validationErrors = [
	check('title')
		.exists({ checkNull: true })
		.withMessage('Title is required')
		.isLength({ min: 1, max: 75 })
		.withMessage('Title must be between 1 and 75 characters'),
	handleValidationErrors,
];

const validateErrorsComments = [
	check('comment')
		.exists({ checkNull: true })
		.withMessage('Comment is required')
		.isLength({ min: 1, max: 255 })
		.withMessage('Comment must be between 1 and 255 characters'),
	handleValidationErrors,
];

/* IMAGES */

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
		const image = await db.Image.findOne({
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
		const { title, content, userId, imageUrl } = req.body;
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

/* COMMENTS */

router.get(
	'/:id(\\d+)/comments',
	asyncHandler(async (req, res) => {
		const id = parseInt(req.params.id, 10);
		console.log(id, '---------------')
		const comments = await db.Comment.findAll({
			where: { imageId: id },
			include: db.User,
		});
		return res.json(comments);
	})
);

router.post(
	'/:id(\\d+)/comments',
	validateErrorsComments,
	asyncHandler(async (req, res) => {
		const { userId, imageId, comment } = req.body;
		const commentObj = await db.Comment.create({
			userId,
			imageId,
			comment,
		});
		const findUser = await db.User.findByPk(userId);
		// console.log(findUser, '---------------')
		commentObj.dataValues['User']=findUser.dataValues
		// console.log(commentObj, 'currrrrrrrrioooousssss')
		return res.json(commentObj);
	})
);

router.delete(
	'/:id(\\d+)/comments/:commentId(\\d+)',
	asyncHandler(async (req, res) => {
		const commentId = parseInt(req.params.commentId, 10);
		const comment = await db.Comment.findByPk(commentId);
		if (!comment) {
			return res.status(404).json({
				message: 'Comment not found',
			});
		}
		await comment.destroy();
		return res.json({ message: 'Comment deleted' });
	})
);

module.exports = router;
