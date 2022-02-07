import React, {useContext} from 'react';

import {Pagination} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {changePage} from "../redux/actions/artActions"

const Pages = () => {

    let quanPages = useSelector(state => state.filtersArt.allElemQuantity)

    let arts = useSelector(state => state.getArts.art)
    let load = useSelector(state => state.getArts.loading)
    let error = useSelector(state => state.getArts.error)
    
    const dispatch = useDispatch();
 
    const pageCount = Math.ceil(quanPages / 6)//всі товари поділив на літ відображення одної сторінки
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
	let CurPage = useSelector(state => state.filtersArt.page)

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={CurPage === page}
                    onClick={() => dispatch(changePage(page))}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default Pages;