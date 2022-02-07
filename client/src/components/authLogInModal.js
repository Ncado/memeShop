import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { login } from '../redux/actions/userActions';
import axios from "axios";
import {addToFavourites,removeFromFavourites} from "../redux/actions/artActions"

import { useDispatch, useSelector } from "react-redux";
//import { login, logout, update } from '../redux/actions/userActions';

const AuthLogInModal = ({ show, onHide, idArt}) => {
const dispatch = useDispatch();
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Username, setUsername] = useState('')
  let token = useSelector(state => state.userAuth.token)

    const LogInHandler = async () => {
        try {


            const data = await axios.post('/api/auth/login', {email: Email, username: Username, password: Password}, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            });
            dispatch(login(data.data.userId,data.data.token,data.data.username ))
            dispatch(addToFavourites(idArt,data.data.token))


        }
        catch (e) {
           await alert(e.response.data.message)
           
            console.log("suka")
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          
          event.stopPropagation();
        }
    
        setValidated(true);
        LogInHandler();
        onHide()
      };
      const [validated, setValidated] = useState(false);
      
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Увійти в акаунт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {/* validated={validated} onSubmit={handleSubmit} */}
                <Form noValidate onSubmit={handleSubmit} validated={validated} >
               
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        required = {true}
                         type="email"
                        value={Email}
                        onChange={e => { setEmail(e.target.value)}} 
                         placeholder="name@example.com" />

                        <Form.Control.Feedback type="invalid">
                        введіть адресу електронної пошти.
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>username</Form.Label>
                        <Form.Control 
                        required = {true}
                        type="text" 
                        
                        value={Username}
                        onChange={e => {
                           
                            setUsername(e.target.value)}} 
                        rows={3} />
                        <Form.Control.Feedback type="invalid">
                        введіть нікнейм
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>password</Form.Label>
                      <Form.Control 
                      required = {true}
                      type="password" 
                      placeholder="Password"
                       value={Password} 
                       onChange={e => setPassword(e.target.value)} />
                          <Form.Control.Feedback type="invalid">
                        введіть пароль
                    </Form.Control.Feedback>
                    </Form.Group>
                 
                    <Button type="submit">Submit form</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>

            </Modal.Footer>
        </Modal>
    );
};

export default AuthLogInModal;