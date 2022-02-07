import React, { useContext, useState,useCallback,useEffect} from "react";
import classes from './CreditsAdd.module.css';
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'


export const AddCreditsPage = () => {
	const {token} = useContext(AuthContext)

	const { request, loading } = useHttp()


	const addCredits = async () => {
		try {
			await request(`/api/plane/addCredits`, 'GET', null, {
				Authorization: `Bearer ${token}`
			  })
			
		} catch (e) {

		}
	}
	



	return (
		<div>
			<p>
				<a className={classes.sliding_button} onClick={addCredits} >Оримати більше кредитів!</a>
			</p>
		</div>
	)
}