import * as imagesActions from '../../store/images';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

const EditImage = () => {
	const dispatch = useDispatch();
	const image = useParams();

	const user = useSelector((state) => state.session.user);
	const images = useSelector((state) => state.images);

	const currentImage = images[image?.id]
	// const images = Object.values(imagesObject);

	const [title, setTitle] = useState(currentImage.title);
	const [imageUrl, setImageUrl] = useState(currentImage.imageUrl);
	const [content, setContent] = useState(currentImage.content);
	const [validationErrors, setValidationErrors] = useState([]);

	const history = useHistory();

	const handleSubmit = async (e) => {
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
			id: image?.id,
		};
		await dispatch(imagesActions.editSingleImage(data));
		history.push(`/images`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<ul>
				{validationErrors.map((error, idx) => (
					<li className="errors-signup" key={idx}>
						{error}
					</li>
				))}
			</ul>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Image URL"
				value={imageUrl}
				onChange={(e) => setImageUrl(e.target.value)}
			/>
			<textarea
				placeholder="Content(OPTIONAL)"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default EditImage;
