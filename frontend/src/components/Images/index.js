import { getImagesAsync } from '../../store/images';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Images = () => {
	const dispatch = useDispatch();
	const imagesObject = useSelector((state) => state.images);
	const images = Object.values(imagesObject);

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
						<NavLink exact to={`/images/${image.id}`}>
							<img src={image.imageUrl} title={image.title} />
						</NavLink>
					</div>
				))}
			</div>
		</div>
	);
};

export default Images;
