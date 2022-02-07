import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import YearBar from "../components/YearBar";
import DeviceList from "../components/DeviceList";
import { useDispatch, useSelector } from "react-redux";
import SortBar from "../components/SortBar"


import Pages from "../components/Pages";

const Shop = () => {
   

    // useEffect(() => {
    //     fetchTypes().then(data => device.setTypes(data))
    //     fetchBrands().then(data => device.setBrands(data))
    //     fetchDevices(null, null, 1, 2).then(data => {
    //         device.setDevices(data.rows)
    //         device.setTotalCount(data.count)
    //     })
    // }, [])

    // useEffect(() => {
    //     fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
    //         device.setDevices(data.rows)
    //         device.setTotalCount(data.count)
    //     })
    // }, [device.page, device.selectedType, device.selectedBrand,])

    // let page = useSelector(state => state.filtersArt.page)

    // const dispatch = useDispatch();
    // useEffect(() => {
	// 	dispatch(getArts([],[],6,page));


	//   }, [dispatch]);
    return (
        <Container>
         тут шоп
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                    <br></br>
                    <br></br>
                    <SortBar/>
                    
                </Col>
                <Col md={9}>
               
                    <YearBar/>
                    <DeviceList/>
                    <Pages/>

                </Col>
            </Row>
        </Container>
   //<div>ssfsfvsdklvnsdlnvsdlnvsdlnvlsdnbklsdnblsdnbkldsnklnklnklnklnklnlnl</div>
    );
};

export default Shop;