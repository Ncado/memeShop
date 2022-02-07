import React, { useContext, useEffect, useState } from "react";
import classes from './card.module.css'
import plus from '../../static/plus.png'
import minus from '../../static/minus.png'
import {useHttp} from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import {ChatPageIo} from "../../pages/Chat_io/chat_io"

export const LinkCard = ({ link }) => {
	const [price, setPrice] = useState(0)
	const { loading, request } = useHttp()
	const [Econom, setEconom] = useState(null)
	const [Buisness, setBuisness] = useState(null)
	const [First, setFirst] = useState(null)
	const {token} = useContext(AuthContext)

	const[B, Bval] = useState(0)
	const[E, Eval] = useState(0)
	const[F, Fval] = useState(0)
	const[ALL, ALLval] = useState(0)


	


	const biletBuyHandler = async () => {
		try {
			await request(`/api/plane/buyBilet`, 'PUT', {
			 
				  PlaneId:link._id,
				  BindedEconom:link.freeEconom[Econom],
				  BindedBuisness:link.freeBuisness[Buisness],
				  BindedFirst:link.freeFirst[First],
				  Place: [Econom,Buisness,First],
				  Prise: B+ E+F
				}, {
				Authorization: `Bearer ${token}`
			  })
		}
		catch (e) {
		}
	}


	
	return (
		<div className={classes.papa}>
			 <table className={classes.as}>
				<thread>Данні рейсу</thread>

				<tr>Відправлення з: {link.from}</tr>
				<tr>Прибуває до: {link.to}</tr>
				<tr>Вільних місць в економ класі: {link.freeEconom.length}</tr>
				<tr>Вільних місць в бізнес классі: {link.freeBuisness.length}</tr>
				<tr>Вільних місць в першому классі: {link.freeFirst.length}</tr>
				<tr>Ціна за одне місце в економ класі: {link.valueEconom}</tr>
				<tr>Ціна за одне місце в бізнес класі: {link.valueBuisness}</tr>
				<tr>Ціна за одне місце в першому класі: {link.valueFirst}</tr>
				<tr>Дата відправлення: {link.departureDate}</tr>
				<tr>Дата прибуття: {link.arrivalDate}</tr>
			</table>



			<div className={classes.back}>
				<form className={classes.decor}>
					<div className={classes.form_left_decoration}></div>
					<div className={classes.form_right_decoration}></div>
					<div className={classes.circle}></div>
					<div className={classes.form_inner}>

				
						<h3>Купити білети</h3>
						<label>
							Купити білет в перший класс:

							<input type="number" placeholder="Натиснути на + щоб обрати номер місця" id="email" name="email" value={link.freeFirst[First]} onInput={() => setFirst(0)} min="0" max="1"  readOnly />
							<div className={classes.symbolWrap}>
								<img className={classes.symbol} src={minus} alt="" onClick={() => {
									if (First !== 0 && First !== 0) {
										setFirst(First - 1)
									}
									

								}

								}></img>
								<img onClick={() => {
									setFirst(First + 1)
									Fval(link.valueFirst)
								}} alt="" className={classes.symbol} src={plus}></img>
							</div>
							<br></br>



						</label>

						<label>

							Купити білет в бізнес класс:

							<input type="number" placeholder="Натиснути на + щоб обрати номер місця" id="password" name="password" value={link.freeBuisness[Buisness]} onInput={() => setBuisness(0)}  min="0" max="1" />
							<div className={classes.symbolWrap}>
								<img className={classes.symbol} src={minus} alt="" onClick={() => {
									if (Buisness !== null && Buisness !== 0) {
										setBuisness(Buisness - 1)
									}
									
								}

								}></img>
								<img onClick={() => {
								Bval(link.valueBuisness)
								setBuisness(Buisness + 1)}} alt="" className={classes.symbol} src={plus}></img>
							</div>
							<br></br>
						</label>

						<label>

							Купити білет в економ класс класс:

							<input type="number" placeholder="Натиснути на + щоб обрати номер місця" id="password" name="password" value={link.freeEconom[Econom]} onInput={() => setEconom(0)}  min="0" max="1" />
							<div className={classes.symbolWrap}>
								<img className={classes.symbol} src={minus} alt="" onClick={() => {
									if (Econom !== 0 && Econom !== 0) {
										setEconom(Econom - 1)
									}
									
								}

								}></img>
								<img onClick={() => {
								Eval(link.valueEconom)
								setEconom(Econom + 1)}} alt="" className={classes.symbol} src={plus}></img>
								<br></br>
							</div>
						</label>

						Ціна: {B+ E+F}
						<label>

							<input type="text" value="Купити білет" onClick={biletBuyHandler}  disabled={loading}  />

						</label>
					</div>
				</form>
			</div>
			<ChatPageIo />
		</div>




	)
}