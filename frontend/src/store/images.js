import { csrfFetch } from './csrf';

export const GET_IMAGES = 'images/getImages';
export const GET_IMAGE = 'images/getImage';
export const ADD_IMAGE = 'images/addImage';
export const EDIT_IMAGE = 'images/updateImage';
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

const editImage = (image) => ({
	type: EDIT_IMAGE,
	image,
});

const deleteImage = (id) => ({
	type: DELETE_IMAGE,
	id,
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

export const editSingleImage = (image) => async (dispatch) => {
	const { title, imageUrl, content, id } = image;
	const response = await csrfFetch(`/api/images/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			title,
			imageUrl,
			content,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(editImage(data));
		return data;
	}
};

export const deleteSingleImage = (id) => async(dispatch) => {
	const response = await csrfFetch(`/api/images/${id}`, {
		method:"DELETE"
	})
	if (response.ok) {
		const data = await response.json();
		dispatch(deleteImage(data.id))
	}
}
/* REDUCERS */

const initialState = {};

const imageReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_IMAGES:
			newState = { ...state };
			action.images.forEach((image) => {
				newState[image.id] = image;
			});
			return newState;
		case GET_IMAGE:
			return { ...state, [action.image.id]: action.image }
		case ADD_IMAGE:
			return { ...state, [action.image.id]: action.image };
		case EDIT_IMAGE:
			return { ...state, [action.image.id]: { ...action.image } };
		case DELETE_IMAGE:
			return delete { ...state, [action.id]: action.id };
		default:
			return state;
	}
};

export default imageReducer;
