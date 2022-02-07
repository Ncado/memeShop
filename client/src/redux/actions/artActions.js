
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";




export const getArts = (firstMention, type, limit, page, filterByRate, filterByTitle) => async (dispatch) => {
	try {
		dispatch({ type: "GET_ARTS_REQUEST" });

		const json = JSON.stringify({
			"firstMention": firstMention,
			"type": type,
			"limit": limit,
			"page": page,
			"sortByPopular": filterByRate,
			"sortByTitle": filterByTitle

		});
		const data = await axios.post('/api/art/all', json, {
			headers: {
				// Overwrite Axios's automatically set Content-Type
				'Content-Type': 'application/json'
			}
		});
			let mass =[]
			for(const item of data.data){
				let temp =  await axios.get(`/api/art/getRating/${item._id}`)
				item.rating = temp.data.rate
				mass.push(item)
			}
			const jsonQuan = JSON.stringify({
				"firstMention": firstMention,
				"type": type,
			});
			const quantityElem = await axios.post('/api/art/getQuantity', jsonQuan, {
				headers: {
					// Overwrite Axios's automatically set Content-Type
					'Content-Type': 'application/json'
				}
			});
		dispatch({ type: "CHANGE_ELEM_QUANTITY",
		payload:quantityElem.data });
		dispatch({
			type: "GET_ARTS_SUCCESS",
			payload:mass
		});
	} catch (error) {
		dispatch({
			type: "GET_ARTS_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};




export const getSingleArt = (id) => async (dispatch) => {
	try {
		dispatch({ type: "GET_SINGLE_ART_REQUEST" });
		
		const { data } = await axios.post(`/api/art/detail/${id}`);


		//let mass =[]
	
			let temp =  await axios.get(`/api/art/getRating/${id}`)
			data.rating = temp.data.rate
		///	mass.push(item)
		
	
	

		dispatch({
			type: "GET_SINGLE_ART_SUCCESS",
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: "GET_SINGLE_ART_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addFilterFirstMention = (year) => async (dispatch) => {
	const { data } = await axios.get(`/api/art/getQuantity`);

	dispatch({ type: "ADD_FIRST_MENTION", payload: year});
};

export const addFilterType = (type) => async (dispatch) => {
	dispatch({ type: "ADD_TYPE", payload: type });
};

export const removeFilterFirstMention = (year) => async (dispatch) => {
	dispatch({ type: "REMOVE_FIRST_MENTION", payload: year });
};
export const removeFilterType = (type) => async (dispatch) => {
	dispatch({ type: "REMOVE_TYPE", payload: type });
};


export const changePage = (page) => async (dispatch) => {
	dispatch({ type: "CHANGE_PAGE", payload: page });
};

export const sortByPrise = () => async (dispatch) => {
	dispatch({ type: "SORT_BY_RATE" });
};
export const sortByTitle = () => async (dispatch) => {
	dispatch({ type: "SORT_BY_TITLE"});
};

export const withoutSort = () => async (dispatch) => {
	dispatch({ type: "WITHOUT_SORT"});
};


export const addToFavourites = (artId,token) => async (dispatch) => {
    

	 await axios.post(`/api/favourite/add/${artId}`,{}, {
		headers: {
		   'Authorization': `Bearer ${token}`,
			// Overwrite Axios's automatically set Content-Type
			'Content-Type': 'application/json'
		}
	});


	dispatch({ type: "ADD_TO_FAVOURITE", payload: artId });
};


export const removeFromFavourites = (artId,token) => async (dispatch) => {

	await axios.post(`/api/favourite/remove/${artId}`,{}, {
		headers: {
		   'Authorization': `Bearer ${token}`,
			// Overwrite Axios's automatically set Content-Type
			'Content-Type': 'application/json'
		}
	});


	dispatch({ type: "REMOVE_FROM_FAVOURITE", payload: artId });
};

export const getAllFavourite = (token) => async (dispatch) => {

	const { data } = await axios.get(`/api/favourite/id`, {
		headers: {
		   'Authorization': `Bearer ${token}`,
			// Overwrite Axios's automatically set Content-Type
			'Content-Type': 'application/json'
		}
	});


	dispatch({ type: "GET_ALL_FAVOURITE", payload: data });
};


export const getAllFavouriteArts = (token) => async (dispatch) => {
	try {
		dispatch({ type: "GET_ARTS_FAVOURITE_REQUEST" });

		const  data = await axios.get(`/api/favourite/`, {
			headers: {
			   'Authorization': `Bearer ${token}`,
				// Overwrite Axios's automatically set Content-Type
				'Content-Type': 'application/json'
			}
		});
			let mass =[]
			for(const item of data.data){
				let temp =  await axios.get(`/api/art/getRating/${item._id}`)
				item.rating = temp.data.rate
				mass.push(item)
			}

		dispatch({
			type: "GET_ARTS_FAVOURITE_SUCCESS",
			payload:mass
		});
	} catch (error) {
		dispatch({
			type: "GET_ARTS_FAVOURITE_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};



export const removeArt = (id) => async (dispatch) => {
	dispatch({ type: "REMOVE_ART", payload: id });
};