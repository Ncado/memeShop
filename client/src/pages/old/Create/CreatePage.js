import React, {useContext, useState} from "react";
import classes from './create.module.css';
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {useHistory} from 'react-router-dom'


export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')
  
 
    const pressHandler = async event => {
      if (event.key === 'Enter') {
        try {
          const data = await request('/api/link/generate', 'POST', {from: link}, {
            Authorization: `Bearer ${auth.token}`
          })
          history.push(`/detail/${data.link._id}`)
        } catch (e) {}
      }
    }
  
    return (
      <div className="row">
        <div>
          <div className="input-field">
            <input
              placeholder="Вставьте ссылку"
              id="link"
              type="text"
              value={link}
              onChange={e => setLink(e.target.value)}
              onKeyPress={pressHandler}
            />
            <label htmlFor="link">Введите ссылку</label>
          </div>
        </div>
      </div>
    )
  }