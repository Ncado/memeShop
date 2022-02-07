import React from 'react'
import {Link} from 'react-router-dom'
import classes from './BiletList.module.css'

export const BiletsList = ({ bilets }) => {
  if (!bilets.length) {
    return <p className="center">Білетів поки немає</p>
  }

  return (
    <table >
      <thead>
      <tr>
        <th>№</th>
        <th>Відбуває з</th>
        <th>Прибуває до</th>
        <th>Місце в економ классі</th>
        <th>Місце в бізнес классі</th>
        <th>Місце в першому классі</th>
        <th>Дата відправки</th>
        <th>Дата прибуття</th>
      </tr>
      </thead>
      <tbody>
      { bilets.map((bilet, index) => {
        return (
          <tr key={bilet._id}>
            <td>{index + 1}</td>
            <td>{bilet.from}</td>
            <td>{bilet.to}</td>
            <td>{bilet.bookedEconom}</td>
            <td>{bilet.bookedBuisness}</td>
            <td>{bilet.bookedFirst}</td>
            <td>{bilet.departureDate}</td>
            <td>{bilet.arrivalDate}</td>
            
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}