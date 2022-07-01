import * as imagesActions from '../../store/images';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

const EditImage = () => {
	const dispatch = useDispatch();
	const image = useParams();

	const user = useSelector((state) => state.session.user);
	const images = useSelector((state) => state.images);

	const currentImage = images[image?.id];
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

		// if (!title.length) errors.push('Title is required');
		if (title.length > 75)
			errors.push('Title must be less than 75 characters');
		if (!imageUrl.length) errors.push('Image URL is required');
		// if (!imageUrl.endsWith('.jps' || '.png' || '.jpeg' || '.gif'))
		// 	errors.push('Image URL must end with .jps, .png, .jpeg, or .gif');
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
		<div className="tester">
			<div className="upload-image-background">
				<div className="upload-image">
					<h1 className="upload-image-h1">Edit Image</h1>
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
							required
							onChange={(e) => setTitle(e.target.value)}
						/>
						<input
							className="upload-input"
							type="text"
							placeholder="Image URL must end with 'jpg,jpeg,gif,png'"
							value={imageUrl}
							required
							pattern="^http[^\?]*.(jpg|jpeg|gif|png)(\?(.*))?$"
							onChange={(e) => setImageUrl(e.target.value)}
						/>
						<textarea
							className="upload-text-area"
							rows="7"
							placeholder="Content(OPTIONAL)"
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

export default EditImage;
