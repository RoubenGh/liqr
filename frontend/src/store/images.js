export const GET_IMAGES = 'images/getImages';
export const GET_IMAGE = 'images/getImage';
export const ADD_IMAGE = 'images/addImage';
export const UPDATE_IMAGE = 'images/updateImage';
export const DELETE_IMAGE = 'images/deleteImage';

const getImages = (images) => ({
	type: GET_IMAGES,
	images,
});

const getImage = (image) => ({
	type: GET_IMAGE,
	image,
});

const addImage = (image) => ({
	type: ADD_IMAGE,
	image,
});

const updateImage = (image) => ({
	type: UPDATE_IMAGE,
	image,
});

const deleteImage = (image) => ({
	type: DELETE_IMAGE,
	image,
});

/* THUNKS */

export const getImagesAsync = () => async (dispatch) => {
	const response = await fetch('/api/images');
	console.log(response)

	if (response.ok) {
		const data = await response.json();
		dispatch(getImages(data));
	}
};

/* REDUCERS */

const initialState = {};

const imageReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_IMAGES:
			return {... action.images}
			// const newImages = {};
			// action.images.forEach((image) => {
			// 	newImages[image.id] = image;
			// });
			// console.log(state)
			// return {
			// 	...state,
			// 	...newImages,
			// };
		default:
			return state;
	}
};

export default imageReducer;
