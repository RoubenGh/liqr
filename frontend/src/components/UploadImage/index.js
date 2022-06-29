import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as imagesActions from '../../store/images';
import './upload.css';

const UploadImage = () => {
	const dispatch = useDispatch();
	const images = useSelector((state) => state.images);
	const user = useSelector((state) => state.session.user);
	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [content, setContent] = useState('');
	const [validationErrors, setValidationErrors] = useState([]);

	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!user) history.push('/login');
		const errors = [];

		if (!title.length) errors.push('Title is required');
		if (title.length > 75)
			errors.push('Title must be less than 75 characters');
		if (!imageUrl.length) errors.push('Image URL is required');
		if (!imageUrl.startsWith('http') && !imageUrl.startsWith('https'))
			errors.push('Image URL must start with http or https');
		if (imageUrl.length > 255) errors.push('Image URL is too long');
		if (content.length > 500) errors.push('Content is too long');

		if (errors.length) {
			setValidationErrors(errors);
			return;
		}

		const data = {
			title,
			imageUrl,
			content,
			userId: user?.id,
		};
		dispatch(imagesActions.uploadImage(data));
		history.push('/images');
	};

	return (
		<div className="tester">
			<div className="upload-image-background">
				<div className="upload-image">
					<h1 className="upload-image-h1">Upload Image</h1>
					<form className="upload-form" onSubmit={handleSubmit}>
						<ul>
							{validationErrors.map((error, idx) => (
								<li className="errors-signup" key={idx}>
									{error}
								</li>
							))}
						</ul>
						<input
							className="upload-input"
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<input
							className="upload-input"
							type="text"
							placeholder="Image URL"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
						<textarea
							className='upload-text-area'
							rows='7'
							cols=''
							placeholder="Content (OPTIONAL)"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<button className="submit-upload" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UploadImage;
