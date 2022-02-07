import { STATES } from "mongoose"




let filtersState = {
	firstMention: [2012, 2013, 2014, 2015],
	types: ["Picture", "Human", "Comix"],
	choosedFirstMention: [],
	choosedType: [],
	page: 1,
	allElemQuantity: 0,


}



export const FiltersArtsReducer = (state = filtersState, action) => {
	switch (action.type) {
		case "ADD_FIRST_MENTION":
			return { ...state, choosedFirstMention: [...state.choosedFirstMention, action.payload] }

		case "REMOVE_FIRST_MENTION":
			return { ...state, choosedFirstMention: state.choosedFirstMention.filter(year => year !== action.payload) }

		case "ADD_TYPE":
			return { ...state, choosedType: [...state.choosedType, action.payload] }

		case "REMOVE_TYPE":
			return { ...state, choosedType: state.choosedType.filter(type => type !== action.payload) }

		case "CHANGE_PAGE":
			return { ...state, page: action.payload }

		case "GET_FIRST_MENTION":
			return state.firstMention

		case "GET_TYPE":
			return state.types

		case "CHANGE_ELEM_QUANTITY":
			return { ...state, allElemQuantity: action.payload }

		default:
			return state
	}
}

export const getArtReducer = (state = { art: [] }, action) => {
	switch (action.type) {
		case "GET_ARTS_REQUEST":
			return {
				...state, loading: true

			};
		case "GET_ARTS_SUCCESS":
			return {
				...state, loading: false,
				art: action.payload,
				// loading: false,
			};
		case "GET_ARTS_FAIL":
			return {

				loading: false,
				error: action.payload,
			};


		case "GET_SINGLE_ART_REQUEST":
			return {
				...state, loading: true
				// loading: true,
				// art: [],
			};
		case "GET_SINGLE_ART_SUCCESS":
			let temp = state.art
			state.art = []
			action.payload.aviable = false
			state.art.push(...temp, action.payload)
			return {
				//	 loading: false,
				...state,

				//	  art: state.art,
				//	 state.art.push(temp,action.payload),
				loading: false,
			};
		case "GET_SINGLE_ART_FAIL":
			return {

				loading: false,
				error: action.payload,
			};

		case "GET_ALL_FAVOURITE":
			return {

				...state, favourite: action.payload
			};
		case "GET_ARTS_FAVOURITE_REQUEST":
			return {
				...state, loading: true

			};
		case "GET_ARTS_FAVOURITE_SUCCESS":
			return {
				...state, loading: false,
				art: action.payload,
				// loading: false,
			};
		case "GET_ARTS_FAVOURITE_FAIL":
			return {

				loading: false,
				error: action.payload,
			};

		case "REMOVE_ART":
		//	state.art.splice(action.payload,1)
			
			return{
					//...state, state.art.splice(action.payload,1)
					...state, art: state.art.filter(artO => artO._id !== action.payload) 

			}
		default:
			return state;
	}
};




let SortState = {
	sortByPrise: false,
	sortByTitle: false,
}

export const sortArtsReducer = (state = SortState, action) => {
	switch (action.type) {
		case "SORT_BY_RATE":
			return { ...state, sortByPrise: true, sortByTitle: false }

		case "SORT_BY_TITLE":
			return { ...state, sortByPrise: false, sortByTitle: true }

		case "WITHOUT_SORT":
			return { ...state, sortByPrise: false, sortByTitle: false }


		default:
			return state
	}
}

export const getsArtRateReducer = (state = { artRate: [] }, action) => {
	switch (action.type) {
		case "SORT_BY_RATE_REQUEST":
			return {
				...state, loading: true
			};

		case "SORT_BY_RATE_SUCCESS":
			let temp = state.artRate
			state.artRate = []
			state.artRate.push(...temp, action.payload)
			return {
				...state,
				loading: false,
			};

		case "SORT_BY_RATE_FAIL":
			return {

				loading: false,
				error: action.payload,
			};

		default:
			return state
	}
}









export const favouriteArtReducer = (state = { favourite: [] }, action) => {
	switch (action.type) {
		case "ADD_TO_FAVOURITE":
			let temp = state.favourite
			state.favourite = []
			state.favourite.push(...temp, action.payload)
			return {
				...state,

			};

		case "REMOVE_FROM_FAVOURITE":
			//let temp2 = state.favourite

			// state.favourite= []
			// state.favourite= state.favourite.filter((elem)=>{
			// 	return elem !==action.payload
			//})
			return {
				...state, favourite: state.favourite.filter(elem => elem !== action.payload)
			}


		case "GET_ALL_FAVOURITE":
			return {

				...state, favourite: action.payload
			};


		default:
			return state
	}
}


