import React, { useEffect, useState } from 'react';
import { Card, Col,Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom"
import star from '../static/star.png'
import { useSelector } from "react-redux";
import blaclHart from "../static/heart_black.png"
import transparentHeart from "../static/heart_transparent.png"
import {addToFavourites,removeFromFavourites} from "../redux/actions/artActions"
import { useDispatch } from "react-redux";
import FavModal from './favModal'


const DeviceItem = ({ art, indexA }) => {
    const dispatch = useDispatch();
    let myFav = useSelector(state => state.favouriteArts.favourite)
 //   const [myFav, setFav] = useState(useSelector(state => state.favouriteArts.favourite))
 const [FavouriteVisible, setFavouriteVisible] = useState(false)

    let isAuth = useSelector(state => state.userAuth.isAuthenticated)

    let token = useSelector(state => state.userAuth.token)
    let arts = useSelector(state => state.getArts.art)
    const [raiting, setRaiting] = useState(0)
    const [ArtInfo, setArtInfo] = useState(1)
    const [count,setCount]=useState(0)

    
    useEffect(() => {
        arts.map((ar) => {
            let ccount = 0;

            if (ar._id == art._id) {
                setArtInfo(ar)
                setCount(art.rating.length)
                art.rating.map(rat => {
                  ccount +=Number(rat.rate)
                  setRaiting(ccount+raiting)
                })
              
            }

        })
        
    }, [arts])

    

    const history = useHistory()
    if (art.aviable) {
        return (
            <Col md={3} className={"mt-3"} >

                <Card style={{ width: 150, cursor: 'pointer' }} border={"light"}>
                    <Image width={150} height={150} src={"http://localhost:5000/" + art.way} onClick={() => history.push("/detail/" + art._id)}/>
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <Col className="d-flex align-items-center">
                            <div>{(raiting/count).toFixed(1)}</div>
                            <Image width={18} height={18} src={star} />
                        </Col>
                        <Col>
                        {myFav.includes(art._id)?
                            <Image width={19} height={19} src={blaclHart} onClick={()=> {
                              dispatch(removeFromFavourites(art._id,token))
                                }}/>
                        :
                        <Image width={18} height={18} src={transparentHeart} onClick={()=> {
                             if(!isAuth){
                                    setFavouriteVisible(true)
                                }
                                else{
                            dispatch(addToFavourites(art._id,token))
                                }
                            }} />

                        }
                        
                        </Col>
                    </div>
                    <div onClick={() => history.push("/detail/" + art._id)}>{art.title}</div>
                </Card>
                <FavModal   show={FavouriteVisible} onHide={() => setFavouriteVisible(false)} idArt={art._id}/>

            </Col>
        );
    }
    else {
        return true
    }
};

export default DeviceItem;