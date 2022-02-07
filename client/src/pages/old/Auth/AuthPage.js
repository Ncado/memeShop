import React, { useContext, useEffect, useState } from "react";
import { useHttp } from '../../hooks/http.hook';
import classes from "./auth.module.css"
import { AuthContext } from '../../context/AuthContext'

const AuthPage = () => {
	const auth = useContext(AuthContext)
	const { loading, request } = useHttp()
	const [form, setForm] = useState({ email: '',username:'', password: '' });
	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}
	const registrHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form })
			console.log('Data', data);
		}
		catch (e) {
		}
	}
	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form })
			auth.login(data.token, data.userId, data.username)
			
			console.log('Data', data);
		}
		catch (e) {
		}
	}

	return (
		<div className={classes.back}>

			<form className={classes.decor}>
				<div className={classes.form_left_decoration}></div>
				<div className={classes.form_right_decoration}></div>
				<div className={classes.circle}></div>
				<div className={classes.form_inner}>
					<h3>Вхід в акаунт</h3>
					<label>
						email:
						<input type="email" placeholder="email" id="email" name="email" value={form.email} onChange={changeHandler} />
					</label>

					<label>
						username:
						<input type="text" placeholder="username" id="username" name="username" value={form.username} onChange={changeHandler} />
					</label>

					<label>

						Пароль:
						<input type="password" placeholder="password" id="password" name="password" value={form.password} onChange={changeHandler} />
					</label>
					{/* <textarea placeholder="Сообщение..." rows="3"></textarea> */}
					<label>

						<input type="submit" value="log in" disabled={loading} onClick={loginHandler} onChange={changeHandler}  />
						<input type="submit" value="sign in" disabled={loading} onClick={registrHandler} onChange={changeHandler} />
					</label>
				</div>
			</form>

		</div>
	);
}

export default AuthPage;