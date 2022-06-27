import { getSingleImage } from '../../store/images';
import { deleteSingleImage } from '../../store/images';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './SingleImage.css';

const SingleImage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	const oneImage = useSelector((state) => state.images[id]);
	const account = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(getSingleImage(id));
	}, [id, dispatch]);

	const ImageDeleter = (id) => {
		dispatch(deleteSingleImage(id));
		history.push('/images');
	};

	if (!oneImage) return null;

	return (
		<div>
			<div>
				<h1 className="title">{oneImage.title}</h1>
				<img src={oneImage.imageUrl} title={oneImage.title} />
				<h3 className="content">{oneImage.content}</h3>
				<p className="username">{oneImage?.User?.username}</p>
				{oneImage?.User?.username === account?.username ? (
					<button type="submit">
						<a href={`/images/${id}/edit`}>Edit</a>
					</button> ) : (<></>)}
					{oneImage?.User?.username === account?.username ? (
				<button onClick={() => ImageDeleter(id)}>Delete</button>) : (<></>)}
			</div>
		</div>
	);
};

export default SingleImage;
