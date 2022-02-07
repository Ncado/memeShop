import React, { useRef, useContext, useState,useEffect} from 'react';

import { Card, Col, InputGroup, Container, Dropdown, FormControl } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { addFilterType, removeFilterType ,getSingleArt} from "../redux/actions/artActions"
import axios from "axios";
import {useHistory} from "react-router-dom"
import useDebounce from '../hooks/debounce.hook';

const adjustSearch = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

    let arts = useSelector(state => state.getArts.art)
    let load = useSelector(state => state.getArts.loading)
    let error = useSelector(state => state.getArts.error)

    const [value, setValue] = useState('');


    const dispatch = useDispatch();

	const [searchTerm, setSearchTerm] = useState('');

	const [results, setResults] = useState([]);
	
	const [isSearching, setIsSearching] = useState(false);


  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const getSearchResults = async (val) => {
	const json = JSON.stringify({

	  "title": val

	});
	const data = await axios.post('/api/art/search', json, {
	  headers: {
		// Overwrite Axios's automatically set Content-Type
		'Content-Type': 'application/json'
	  }
	});
	
	setResults(data.data);
	setIsSearching(false);
	console.log(results)
  }

  useEffect(
    () => {
		if (debouncedSearchTerm) {
			
			setIsSearching(true);
			
			getSearchResults(debouncedSearchTerm)
		  } else {
			setResults([]);
		  }
		},
		[debouncedSearchTerm])

   const getNotExistArt = async(oneArtId) =>{
    let isExist = false
    arts.map((art) => {
      if (art._id == oneArtId) {
        isExist = true
        return true
      }
    
    })
      if(!isExist){
        dispatch(getSingleArt(oneArtId))
      }

   }

	let x = React.Children.toArray(children);
	const history = useHistory()
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => {
            setValue(e.target.value)
            console.log(typeof value)
            setSearchTerm(value)
          }}
          value={value}
        />
		{
			results.map((item,index)=>{
				if(index>4){
					return true
				}
		x.push(<Dropdown.Item eventKey={index} onClick={() => {getNotExistArt(item._id) ; history.push("/detail/" + item._id)}}> {item.title}</Dropdown.Item>)
			})
		}


        {
			
			x.filter(
          (child) =>
            true,
        )}
      

      </div>
    );
  },
);

const Search = () => {

  let choosedType = useSelector(state => state.filtersArt.choosedType)
  const types = useSelector(state => state.filtersArt.types)
  const dispatch = useDispatch();


  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-custom-components">
        Пошук
      </Dropdown.Toggle>

      <Dropdown.Menu as={adjustSearch}>
 
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default Search;