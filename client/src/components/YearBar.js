import React, {useContext} from 'react';

import {Card, Row,Col,InputGroup} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {addFilterFirstMention, removeFilterFirstMention} from "../redux/actions/artActions"
const YearBar = () => {
    let choosedfirstMention = useSelector(state => state.filtersArt.choosedFirstMention)
	const years = useSelector(state => state.filtersArt.firstMention)
    const dispatch = useDispatch();


    const SettingUpYear = (CurYear) =>{
            
        if(choosedfirstMention.length){
            let temp = 0
            choosedfirstMention.map((year)=>{
                if(CurYear==year){
                    dispatch(removeFilterFirstMention(CurYear))
                    temp +=1
                }
            })
           if(temp!=0){
               return true
           }
           dispatch(addFilterFirstMention(CurYear))
           return true
        }
      
        dispatch(addFilterFirstMention(CurYear))

    }

    return (
        <Row className="d-flex">
            {years.map(year =>
                <Col
                    style={{cursor:'pointer'}}
                    // key={year.id}
                    className="p-3"
                    //onClick={() => dispatch(addFilterFirstMention(year))}
                    // border={year === device.selectedBrand.id ? 'danger' : 'light'}
                >
                  <InputGroup className="mb-3">
                            <InputGroup.Checkbox  onChange={() => SettingUpYear(year)} aria-label="Checkbox for following text input" />
                            <InputGroup.Text>{year}</InputGroup.Text>
                        </InputGroup>
                  
                </Col>
            )}
        </Row>
    );
};

export default YearBar;