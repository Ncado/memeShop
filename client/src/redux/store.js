import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
//import { cartReducer } from "./reducers/cartReducers";
import {
  getArtReducer,
  FiltersArtsReducer,
  sortArtsReducer,
  getsArtRateReducer,
  favouriteArtReducer

} from "./reducers/ArtReducers";

import {UserAuthReducer} from "./reducers/UserReducers"
const reducer = combineReducers({
 // cart: cartReducer,
  getArts: getArtReducer,
  filtersArt: FiltersArtsReducer,
  userAuth: UserAuthReducer,
  sortsArts: sortArtsReducer,
  rateArt:getsArtRateReducer,
  favouriteArts:favouriteArtReducer

});

const middleware = [thunk];

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};

const store = createStore(
  reducer,
 // INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;