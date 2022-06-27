import { getImagesAsync } from '../../store/images';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

const Images = () => {
	const dispatch = useDispatch();
	const imagesObject = useSelector((state) => state.images);
	const images = Object.values(imagesObject);
	// console.log(images, '111111111111')
	const [imagesState, setImagesState] = useState(false);

	useEffect(() => {
		dispatch(getImagesAsync());
	}, [dispatch]);

	return (
		<div>
			<h1>Images</h1>
			<div>
				{images.map((image) => (
					<div key={image.id}>
						<h2>{image.title}</h2>
						<a href={`/images/${image.id}`}>
							<img src={image.imageUrl} title={image.title} />
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default Images;
