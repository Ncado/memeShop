import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Image, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSingleArt } from "../redux/actions/artActions"
import { addToFavourites, removeFromFavourites,removeArt} from "../redux/actions/artActions"
import blaclHart from "../static/heart_black.png"
import transparentHeart from "../static/heart_transparent.png"

const Favourites = () => {
    const dispatch = useDispatch();
    let arts = useSelector(state => state.getArts.art)
    let load = useSelector(state => state.getArts.loading)
    let error = useSelector(state => state.getArts.error)
    let MyFavorites = useSelector(state => state.favouriteArts.favourite)
    let token = useSelector(state => state.userAuth.token)
    const [artsST, setArtsSt] = useState(false)

    //   const [reversedFav, setReversedFav] = useState([])
    let reversedFav = []
    let curArtsId = []

    useEffect(() => {

    }, [])

    const func = () => {
        arts.map((item) => {
            curArtsId.push(item._id)
        })

        MyFavorites.map((item) => {
            if (!curArtsId.includes(item)) {
                dispatch(getSingleArt(item))
            }

        })


    }
    return (

        <Row>

            <Col>мої улюблені</Col>
            <Row>

                {load ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (

                    arts.map((art, index) =>
                    <Container className=" p-4">
                                    <Card border="dark" pl={1} m={9} >
                                        <Row>
                                            <Col md={2}>
                                                <Image width={200} src={"http://localhost:5000/" + art.way} />

                                            </Col>
                                            <Col>
                                                <Row>
                                                    {art.title}
                                                </Row>
                                                <Row>
                                                    {art.describe}
                                                </Row>
                                            </Col>
                                            <Col>
                                                {MyFavorites.includes(art._id) ?
                                                    <Image width={19} height={19} src={blaclHart} onClick={() => {
                                                        dispatch(removeFromFavourites(art._id, token))
                                                        dispatch(removeArt(art._id))
                                                    }} />
                                                    :
                                                    <Image width={18} height={18} src={transparentHeart} onClick={() => {

                                                        dispatch(addToFavourites(art._id, token))
                                                       
                                                    }} />

                                                }
                                            </Col>
                                        </Row>
                                    </Card>
                                </Container>

                            
            
                )
                )

              
                
                
                }
            </Row>

        </Row>
    );
};

export default Favourites;