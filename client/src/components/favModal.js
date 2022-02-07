import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Col, Row } from "react-bootstrap";
import { login } from '../redux/actions/userActions';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AuthLogInModal from './authLogInModal';
import AuthSignInModal from './authRegModal'

//import { login, logout, update } from '../redux/actions/userActions';

const FavModal = ({ show, onHide,idArt}) => {
    const dispatch = useDispatch();
    const [LogInVisible, LogInSetVisible] = useState(false)
    const [SignInVisible, SignInSetVisible] = useState(false)



    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обрати
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row>
                        <Button
                            variant={"outline-dark"}
                            className="mt-4 p-2"
                            onClick={() => {
                               
                                LogInSetVisible(true);
                               
                                }}
                        >
                            Увійти
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            variant={"outline-dark"}
                            className="mt-4 p-2"
                            onClick={() =>{ SignInSetVisible(true);}}
                        >
                            Зареєструватися
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            variant={"outline-dark"}
                            className="mt-4 p-2"
                            onClick={onHide}
                        >
                            Продовжити як гість
                        </Button>
                    </Row>
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={()=>{
                    onHide()
                    LogInSetVisible(false)
                    SignInSetVisible(false)
                    }}>Закрити</Button>
                <AuthLogInModal idArt={idArt} show={LogInVisible} onHide={() => LogInSetVisible(false)} />
                <AuthSignInModal show={SignInVisible} onHide={() => SignInSetVisible(false)} />
            </Modal.Footer>
        </Modal>
    );
};

export default FavModal;