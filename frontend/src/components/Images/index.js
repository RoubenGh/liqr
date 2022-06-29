import { getImagesAsync } from '../../store/images';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './images.css';

const Images = () => {
	const dispatch = useDispatch();
	const imagesObject = useSelector((state) => state.images);
	const images = Object.values(imagesObject);

	useEffect(() => {
		dispatch(getImagesAsync());
	}, [dispatch]);

	return (
		<div className="tester">
			<div className="images-background-image">
				<div className="all-images-container">
					{images.map((image) => (
						<div className="image-container" key={image.id}>
							<div>
								<h2 className="image-title">{image.title}</h2>
							</div>
							<NavLink exact to={`/images/${image.id}`}>
								<img
									className="image-frame"
									src={image.imageUrl}
									title={image.title}
								/>
							</NavLink>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Images;
