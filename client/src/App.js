import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";

import NavBar from "./components/NavBar";

import {useRoutes} from "./routes"
import {Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Shop from "./pages/Shop"

import { getArts} from "./redux/actions/artActions";
import { update } from './redux/actions/userActions';
import {sortByPrise, sortByTitle,getAllFavourite} from "./redux/actions/artActions";
const App = () => {
	let page = useSelector(state => state.filtersArt.page)
  let filterByPrise = useSelector(state=>state.sortsArts.sortByPrise)
  let filterByTitle = useSelector(state=>state.sortsArts.sortByTitle)
	let choosedType = useSelector(state => state.filtersArt.choosedType)
	let choosedFirstMention = useSelector(state => state.filtersArt.choosedFirstMention)
  let token = useSelector(state => state.userAuth.token)

    const dispatch = useDispatch();
    useEffect(() => {
		dispatch(getArts(choosedFirstMention,choosedType,6,page,filterByPrise,filterByTitle));
    

	  }, [dispatch,page,choosedType,choosedFirstMention,filterByPrise,filterByTitle]);

    useEffect(() => {
      dispatch(update());
      
      dispatch(getAllFavourite(token))
      
    },[token]);

    const [loading, setLoading] = useState(true)



    return (
         <BrowserRouter>
            <NavBar />
            {useRoutes()}
			{/* <Shop /> */}
        </BrowserRouter>
    );
};

export default App;