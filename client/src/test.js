import React, { useContext, useState, useCallback,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
export const Test = () => {


    let art = useSelector(state => state.getArts.art)
	let load = useSelector(state => state.getArts.loading)
	let error = useSelector(state => state.getArts.error)
    let arts = art
    console.log(error)
	console.log(load)
	console.log(arts)
	console.log(11111111111111111111111111)
	return (

		<div >
									{load ? (
									<h2>Loading...</h2>
									) : error ? (
									<h2>{error}</h2>
									) : (
										arts.map(t=> <p>{t._id}</p>))}
								</div>
	)
}