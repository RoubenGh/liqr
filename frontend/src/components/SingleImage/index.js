import { getSingleImage } from '../../store/images';
import { editSingleImage } from '../../store/images';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './SingleImage.css';


const SingleImage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const {userId} = useParams();
	const user = useSelector((state) => state.session.user);
	const oneImage = useSelector((state) => state.images) ;
	const [title, setTitle] = useState(oneImage.title);
	const [content, setContent] = useState(oneImage.content);
	// console.log()

	useEffect(() => {
		dispatch(getSingleImage(id));
	}, [id, dispatch]);


	// console.log(oneImage, 111111111111111111111111111111)

	return (
		<div>
			<div>
				<h1 className='title'>{oneImage.title}</h1>
				<img src={oneImage.imageUrl} title={oneImage.title}/>
				<h3 className='content'>{oneImage.content}</h3>
				<p className='username'>{oneImage?.User?.username}</p>
				<button type='submit'>
					<a href={`/images/${id}/edit`}>
						Edit
					</a>
				</button>
			</div>
		</div>
	);
};

export default SingleImage;
