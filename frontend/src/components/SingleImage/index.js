import { getSingleImage } from '../../store/images';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SingleImage.css';

const SingleImage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const oneImage = useSelector((state) => state.images);
	const [title, setTitle] = useState(oneImage.title);
	const [content, setContent] = useState(oneImage.content);

	useEffect(() => {
		dispatch(getSingleImage(id));
	}, [id, dispatch]);

	console.log(oneImage)

	return (
		<div>
			<div>
				<h1 className='title'>{oneImage.title}</h1>
				<img src={oneImage.imageUrl} title={oneImage.title}/>
				<h3 className='content'>{oneImage.content}</h3>
			</div>
		</div>
	);
};

export default SingleImage;
