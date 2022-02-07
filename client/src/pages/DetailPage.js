import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, ListGroup } from "react-bootstrap";
import bigStar from '../static/bigStar.png'
import { useParams } from 'react-router-dom'
import RaitingModal from '../components/raitingModal'
import { useDispatch, useSelector } from "react-redux";
import { addFilterType, removeFilterType ,getSingleArt} from "../redux/actions/artActions"

const DetailPage = () => {
    const dispatch = useDispatch();

    let arts = useSelector(state => state.getArts.art)
    let load = useSelector(state => state.getArts.loading)
    let error = useSelector(state => state.getArts.error)
    const [count,setCount]=useState(0)


    const [RaitingVisible, setRaitingVisible] = useState(false)

    const [ArtTitle, setArtTitle] = useState()
    const [ArtWay, setArtWay] = useState()
    const [ArtInfo, setArtInfo] = useState(0)
    const [raiting, setRaiting] = useState(0)

    const { id } = useParams({})

    const [isExist, setisExist] = useState(false)

   
    useEffect(() => {
        
        let ccountRate = 0;
        arts.map((art) => {
           
            if (art._id == id) {
             
               // console.log(art)
                setArtInfo(art)
               setCount(art.rating.length)
              art.rating.map(rat => {
                ccountRate +=Number(rat.rate)
                setRaiting(ccountRate+raiting)

            })
            }
          


        })
        
        console.log(ArtInfo)
     
    }, [arts])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={7} >
                    <Image width={600} src={"http://localhost:5000/" + ArtInfo.way} />
                </Col>

                <Col md={4}>

                    <Row className="d-flex flex-column align-items-center">

                        <div
                            className="d-flex align-items-center justify-content-center"
                            onClick={() => setRaitingVisible(true)}
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 140, height: 140, backgroundSize: 'cover', fontSize: 34 }}
                        >
                            {(raiting/count).toFixed(1)}
                        </div>

                        <Card
                            className="d-flex flex-column align-items-center justify-content-around"
                            style={{ width: 300, fontSize: 32, border: '5px solid lightgray' }}
                        >
                            <h2>{ArtInfo.title}</h2>
                            <h3>{ArtInfo.prise} грн.</h3>
                            <Button variant={"outline-dark"}>Додати в корзину</Button>
                        </Card>
                        <Row className="d-flex flex-column align-items-center">
                        <ListGroup>
                        <ListGroup.Item ></ListGroup.Item>

                            <ListGroup.Item variant="info">Перша згадка: {ArtInfo.firstMention}</ListGroup.Item>
                            <ListGroup.Item variant="info">Розміри: {ArtInfo.size}</ListGroup.Item>
                            <ListGroup.Item variant="info">Тип: {ArtInfo.type}</ListGroup.Item>
                            


                        </ListGroup>
                        </Row>
                    </Row>
                </Col>
                {/* <Col md={4}>
                
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300,  fontSize: 32, border: '5px solid lightgray'}}
                    >
                    <h2>{ArtInfo.title}</h2>
                        <h3>От: {ArtInfo.prise} руб.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                    

                 
                </Col> */}
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Опис</h1>

                <Row >
                    {ArtInfo.describe}
                </Row>
          
            </Row>
            <RaitingModal show={RaitingVisible} onHide={() => setRaitingVisible(false)} />
        </Container>
    );
};

export default DetailPage;