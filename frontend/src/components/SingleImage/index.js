import { getSingleImage, deleteSingleImage } from '../../store/images';
import {
	getCommentsAsync,
	addCommentAsync,
	deleteCommentAsync,
	cleanComments,
} from '../../store/comments';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import './SingleImage.css';

const SingleImage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	const oneImage = useSelector((state) => state.images[id]);
	const account = useSelector((state) => state.session.user);
	const comments = Object.values(useSelector((state) => state.comments));
	const [comment, setComment] = useState('');
	const [isLoaded, setLoaded] = useState(false);
	const [validationErrors, setValidationErrors] = useState([]);
	// console.log(account, '------------')

	useEffect(() => {
		// if (!account) history.push('/');
		dispatch(getSingleImage(id))
			.then(async () => await dispatch(getCommentsAsync(id)))
			.then(() => setLoaded(true));

		return () => {
			dispatch(cleanComments());
		};
	}, [id, dispatch]);



	const ImageDeleter = async (e) => {
		await dispatch(deleteSingleImage(id));
		history.push('/images');
	};

	if (!oneImage) return null;


	const notLoggedIn = () => {
		if (!account) history.push('/login');
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setValidationErrors([]);
		const errors = [];

		if (comment.length > 255) errors.push('Comment is too long');

		if (errors.length) {
			setValidationErrors(errors);
			return;
		}

		const data = {
			comment,
			userId: account?.id,
			imageId: oneImage?.id,
		};
		dispatch(addCommentAsync(data))
			.then(dispatch(getSingleImage(id)))
			.then(setComment(''));
	};

	return (
		isLoaded && (
			<div>
				<div>
					<h1 className="title">{oneImage.title}</h1>
					<p className="username">{oneImage?.User?.username}</p>
					<img src={oneImage.imageUrl} title={oneImage.title} />
					<h3 className="content">{oneImage.content}</h3>
					{oneImage?.User?.username === account?.username ? (
						<button type="submit">
							<NavLink exact to={`/images/${id}/edit`}>
								Edit
							</NavLink>
						</button>
					) : (
						<></>
					)}
					{oneImage?.User?.username === account?.username ? (
						<button onClick={ImageDeleter}>Delete</button>
					) : (
						<></>
					)}
				</div>
				<h1 className="comments">Comments</h1>
				<div className="comments">
					{comments &&
						comments.map((comment) => {
							return (
								<div key={comment.id}>
									<p className="ptagz-comments">{comment?.comment}</p>
									<p className="ptagz-usename">
										{comment?.User?.username}
									</p>

									{comment?.User?.username === account?.username ? (
										<button
											onClick={() =>
												dispatch(
													deleteCommentAsync(id, comment.id)
												).then(() => dispatch(getCommentsAsync(id)))
											}
										>
											Delete
										</button>
									) : (
										<></>
									)}
								</div>
							);
						})}
				</div>

				<form onSubmit={handleSubmit}>
					<ul>
						{validationErrors.map((error, idx) => (
							<li className="errors-signup" key={idx}>
								{error}
							</li>
						))}
					</ul>
					<textarea
						placeholder="Add a comment"
						value={comment}
						required
						onChange={(e) => setComment(e.target.value)}
					/>
					<button onClick={notLoggedIn} type="submit">Submit</button>
				</form>
			</div>
		)
	);
};

export default SingleImage;
