import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { login } from '../redux/actions/userActions';
import axios from "axios";

const AuthSignInModal = ({ show, onHide }) => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Username, setUsername] = useState('')
    const [Phone, setPhone] = useState('')
    const registrHandler = async () => {
        try {


            const data = await axios.post('/api/auth/register', {email: Email, username: Username, password: Password, phone:Phone}, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            });
            console.log('Data', data);
          //  return data
        }
        catch (e) {
            alert(e.message)
        }
    }
 



    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [usernameValid, setUsernameValid] = useState(null)
    const [phoneValid, setPhoneValid] = useState(false)
 
    const [validated, setValidated] = useState(false);
    const [erors, setErrors] = useState('')
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            return false

        }

        registrHandler()
        onHide()
    };

   
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Зареєструватися
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* validated={validated} onSubmit={handleSubmit} */}
                <Form onSubmit={handleSubmit}  >

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required={true}
                            type="email"
                         
                            value={Email}
                 
                            placeholder="name@example.com" 

                            isValid={emailValid}
                            isInvalid={!emailValid}
                            onChange={e => {
                                setEmail(e.target.value)
                            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                            if ( re.test(e.target.value)) {
                                setEmailValid(true)
                                }
                                else {
                                    setEmailValid(false)
                                }

                            }
                            }
                            />

                        <Form.Control.Feedback type="invalid">
                            введіть адресу електронної пошти.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>username</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            isValid={usernameValid}
                            isInvalid={!usernameValid}
                            value={Username}
                            onChange={e => {
                                setUsername(e.target.value)
                                if (/[!@#$&*%]/.test(e.target.value)){
                                    
                                    setUsernameValid(false)
                                    }
                                
                                else {
                                    setUsernameValid(true)
                                }

                            }
                            }
                            rows={3} />
                        <Form.Control.Feedback type="invalid">
                            В нікнеймі користувача заборонені спецсимволи
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            required={true}
                            type="text"
                            placeholder="+380ХХХХХХХХ"
                            value={Phone}
                            
                            isValid={phoneValid}
                            isInvalid={!phoneValid}
                            onChange={e => {
                                setPhone(e.target.value)
                            //    if(e.target.value.length>1){
                            //         console.log("sUKAA")
                            //     }
                            if (e.target.value[0]==="+"&&(e.target.value.length>10)&&(e.target.value.length<14)) {
                                setPhoneValid(true)
                                }
                                else {
                                    setPhoneValid(false)
                                }

                            }
                            }
                            />
                            
                        <Form.Control.Feedback type="invalid">
                            введіть телефон
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                            required={true}
                            
                            type="password"
                            placeholder="Password"
                            value={Password}
                            isValid={passwordValid}
                            isInvalid={!passwordValid}
                            onChange={e => {
                                setPassword(e.target.value)
                            if (/[/^\w+$/]/.test(e.target.value)&&(/[!@#$&*%]/.test(e.target.value))) {
                                setPasswordValid(true)
                                }
                                else {
                                    setPasswordValid(false)
                                }

                            }
                            }
                             />
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

export default AuthSignInModal;