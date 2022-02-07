import React, { useContext, useState, useCallback,useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import classes from "./nav.module.css"
import { Loader } from "../components/Loader/Loader";
import { useHttp } from "../hooks/http.hook";




export const Navbar = () => {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const { request, loading } = useHttp()
	const [Credit, setCredit] = useState(0)
	const {token} = useContext(AuthContext)

	const getCredits = useCallback(async () => {
		try {
			const fetched = await request(`/api/plane/getCredits`, 'GET', null, {
				Authorization: `Bearer ${token}`
			  })
			setCredit(fetched)
		} catch (e) {

		}
	}, [token,request])

	useEffect(() => {
		getCredits()
	}, [getCredits]) 

	const logoutHandler = event => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}

	if (loading) {
		return <Loader />
	}
	return (

		<div className={classes.container} >
			<p className={classes.lead}>             </p>
			<div className={classes.header_bar}>
				<h1 className={classes.logo}>C</h1>
				<ul className={classes.slider_menu}>
					<li>Credits: {Credit}</li>
					<li><NavLink to="/myBilets">Мої білети</NavLink></li>
					<li><NavLink to="/addCredits">Отримати кредити</NavLink></li>
					<li><NavLink to="/plane/all">Рейси</NavLink></li>
					<li><NavLink to="/chatIo">Чатік</NavLink></li>
					<li><a href="/" onClick={logoutHandler}>Вийти</a></li>
				</ul>
			</div>
		</div>

	)
}