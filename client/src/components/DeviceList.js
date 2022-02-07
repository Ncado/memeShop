import React, { useContext } from 'react';
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { useDispatch, useSelector } from "react-redux";

const DeviceList = () => {
    let arts = useSelector(state => state.getArts.art)
    let load = useSelector(state => state.getArts.loading)
    let error = useSelector(state => state.getArts.error)
    
    return (
        <Row className="d-flex">
            {load ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : (


                arts.map((art,index) =>
                   <DeviceItem key={art.id} art={art} indexA={index}/>
            )

               // art.map(t => <p>{t._id}</p>)
                
                
                )}

         
        </Row>
    );
};

export default DeviceList;