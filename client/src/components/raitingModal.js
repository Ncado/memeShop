import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { login } from '../redux/actions/userActions';
import { Card, Col, Container, Image, Row} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";




const RaitingModal = ({ show, onHide }) => {


   const linkId = useParams().id
    const [Eval, setEval] = useState(false)
    let token = useSelector(state => state.userAuth.token)
    const AddRatingHandler = async () => {
        try {


            const data = await axios.post('/api/art/addRating/'+linkId, {eval: Eval}, {
                headers: {
                   'Authorization': `Bearer ${token}`,
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
 



   

 
    const [validated, setValidated] = useState(false);

    const [erors, setErrors] = useState('')

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     event.preventDefault();

    //     if (form.checkValidity() === false) {
    //         event.stopPropagation();
    //         return false

    //     }

    //     registrHandler()
    //     onHide()
    // };

   
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оцінити
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
                {/* validated={validated} onSubmit={handleSubmit} */}
                <Button variant="outline-primary" onClick={()=>setEval(5)} >(5) Янголи спустилися з небес і заспівали голосом бога</Button>
                <br></br>
                <br></br>
                <Button variant="outline-primary" onClick={()=>setEval(4)}>(4) ААХАХАХА</Button>
                <br></br>
                <br></br>
                <Button variant="outline-primary" onClick={()=>setEval(3)} >(3) Нормально, нормально</Button>
                <br></br>
                <br></br>
                <Button variant="outline-primary" onClick={()=>setEval(2)}>(2) Могло бути і ліпше</Button>
                <br></br>
                <br></br>
                <Button variant="outline-primary" onClick={()=>setEval(1)} >(1) Шляпа</Button>
                <br></br>
                <br></br>
                <Button variant="outline-success" onClick={()=>{AddRatingHandler();
                onHide()
                }} >Submit</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>

            </Modal.Footer>
        </Modal>
    );
};

export default RaitingModal;