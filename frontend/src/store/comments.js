import { csrfFetch } from './csrf';

export const GET_COMMENTS = 'comments/getComments';
export const ADD_COMMENT = 'comments/addComment';
export const DELETE_COMMENT = 'comments/deleteComment';
export const CLEAN_STATE = 'comments/cleanState';

const getComments = (comments) => ({
	type: GET_COMMENTS,
	comments,
});

const addComment = (comment) => ({
	type: ADD_COMMENT,
	comment,
});

const deleteComment = (id) => ({
	type: DELETE_COMMENT,
	id,
});

export const cleanComments = () => {
	return {
		type: CLEAN_STATE,
	};
};

/* THUNKS */

export const getCommentsAsync = (imageId) => async (dispatch) => {
	const response = await csrfFetch(`/api/images/${imageId}/comments`);
	if (response.ok) {
		const data = await response.json();
		dispatch(getComments(data));
	}
};

export const addCommentAsync = (comments) => async (dispatch) => {
	const { userId, imageId, comment } = comments;
	const response = await csrfFetch(`/api/images/${imageId}/comments`, {
		method: 'POST',
		body: JSON.stringify({
			userId,
			imageId,
			comment,
		}),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addComment(data));
		return data;
	}
};

export const deleteCommentAsync = (imageId, commentId) => async (dispatch) => {
	console.log(commentId);
	const response = await csrfFetch(
		`/api/images/${imageId}/comments/${commentId}`,
		{
			method: 'DELETE',
		}
	);
	if (response.ok) {
		dispatch(deleteComment(commentId));
	}
};

/* REDUCERS */

const initialState = {};

const commentsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case GET_COMMENTS:
			// return { ...action.comments }
			newState = { ...state };
			action.comments.forEach((comment) => {
				newState[comment.id] = comment;
			});
			return newState;
		case CLEAN_STATE:
			const cleanState = {};
			return cleanState
		case ADD_COMMENT:
			// return { ...state, ...action.comment}
			return { ...state, [action.comment.id]: action.comment };
		case DELETE_COMMENT:
			return delete { ...state, [action.id]: action.id };
		default:
			return state;
	}
};

export default commentsReducer;
