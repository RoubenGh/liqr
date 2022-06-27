import { csrfFetch } from './csrf';

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
	const response = await csrfFetch('/api/images');
	console.log(response);

	if (response.ok) {
		const data = await response.json();
		dispatch(getImages(data));
	}
};

export const getImagesByUser = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/images/${userId}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getImages(data, userId));
	}
};

export const getSingleImage = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/images/${id}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(getImage(data));
		return data;
	}
};

export const uploadImage = (image) => async (dispatch) => {
	const { title, imageUrl, content, userId } = image;
	const response = await csrfFetch('/api/images', {
		method: 'POST',
		body: JSON.stringify({
			title,
			imageUrl,
			content,
			userId,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addImage(data));
		return data;
	}
};

// 	const response = await fetch('/api/images', {
// 		method: 'POST',
// 		body: image,
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(addImage(data));
// 		return data;
// 	}
// }

/* REDUCERS */

const initialState = {};

const imageReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_IMAGES:
			return { ...state, ...action.images };
		case GET_IMAGE:
			return { ...state, ...action.image };
		case ADD_IMAGE:
			let newState;
			if (!state[action.image.id]) {
				newState = { ...state, [action.image.id]: action.image };
			}
			return newState;
		default:
			return state;
	}
};

export default imageReducer;
