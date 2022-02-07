import React, {useState} from 'react';

import {Container,DropdownButton,Dropdown} from "react-bootstrap";
import { useDispatch } from "react-redux";
import {sortByPrise, sortByTitle, withoutSort} from "../redux/actions/artActions"

const SortBar = () => {
    const dispatch = useDispatch();

    const [Sort, setSort] = useState("Сортування відсутнє")

 
const setSortPrise =()=>{
    dispatch(sortByPrise())
    setSort("Сортовано за ціною")
    console.log(99999999)
}
const setSortTitle =()=>{
    dispatch(sortByTitle())
    setSort("Сортовано за назвою")
}

const eraseSort =()=>{
    dispatch(withoutSort())
    setSort("Сортування відсутнє")
}



    return (
        <Container>
        сортування:
<DropdownButton id="dropdown-item-button" title={Sort}>
  <Dropdown.Item as="button" onClick={()=>setSortPrise()}>Сортування за ціною</Dropdown.Item>
  <Dropdown.Item as="button" onClick={()=>setSortTitle()}>Сортування за назвою</Dropdown.Item>
  <Dropdown.Item as="button" onClick={()=>eraseSort()} >Без сортування</Dropdown.Item>
</DropdownButton>
        </Container>

    );
};

export default SortBar;