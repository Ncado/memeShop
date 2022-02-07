import React from 'react'
import {Link} from 'react-router-dom'

export const PlaneComp = ({ plane }) => {
  if (!plane.length) {
    return <p className="center">Літаків з дивних причин поки немає</p>
  }
  return (
    <table >
      <thead>
      <tr>
        <th>№</th>
        <th>Відправлення з</th>
        <th>Прибуває до</th>
        <th>Вільних місць в економ класі</th>
        
        <th>Вільних місць в бізнес классі</th>
        <th>Вільних місць в першому классі</th>
        <th>Ціна за одне місце в економ класі</th>
        <th>Ціна за одне місце в бізнес класі</th>
        <th>Ціна за одне місце в першому класі</th>
        <th>Дата відправлення</th>
        <th>Дата прибуття</th>
      </tr>
      </thead>
      <tbody>
      { plane.map((plane, index) => {
        return (
          <tr key={plane._id}>
            <td>{index + 1}</td>
            <td>{plane.from}</td>
            <td>{plane.to}</td>
            <td>{plane.freeEconom.length}</td>
            <td>{plane.freeBuisness.length}</td>
            <td>{plane.freeFirst.length}</td>
            <td>{plane.valueEconom}</td>
            <td>{plane.valueBuisness}</td>
            <td>{plane.valueFirst}</td>
            <td>{plane.departureDate}</td>
            <td>{plane.arrivalDate}</td>
            <td>
              <Link to={`/detail/${plane._id}`}>Відкрити</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}