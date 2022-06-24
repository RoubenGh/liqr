import { getImagesAsync } from '../../store/images';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

const Images = () => {
	const dispatch = useDispatch();
	const imagesObject = useSelector((state) => state.images);
	const images = Object.values(imagesObject);
	const [imagesState, setImagesState] = useState(false);

	useEffect(() => {
		dispatch(getImagesAsync());
	}, [dispatch]);

	return (
		<div>
			<h1>Images</h1>
			{/* <ul>
				{images.map((image) => (
					<li key={image.id}>
						<NavLink to={`/images/${image.id}`}>{image.title}</NavLink>
					</li>
				))}
			</ul>
			<Route
				path="/images/:id"
				render={({ match }) => (
					<div>
						<h2>{images[match.params.id].title}</h2>
						<img src={images[match.params.id].imageUrl} />
					</div>
				)}
			/> */}
		</div>
	);
};

export default Images;
