    import React, {useRef, useContext, useState} from 'react';

    import {Card, Col,InputGroup} from "react-bootstrap";
    import ListGroup from "react-bootstrap/ListGroup";
    import { useDispatch, useSelector } from "react-redux";
    import {addFilterType, removeFilterType} from "../redux/actions/artActions"
    
    const TypeBar = () => {
        
        let choosedType = useSelector(state => state.filtersArt.choosedType)
        const types = useSelector(state => state.filtersArt.types)
        const dispatch = useDispatch();


     


        const SettingUpType = (CurType) =>{
            
            if(choosedType.length){
                let temp = 0
                choosedType.map((type)=>{
                    if(CurType==type){
                        dispatch(removeFilterType(CurType))
                        temp +=1
                    }
                })
               if(temp!=0){
                   return true
               }
               dispatch(addFilterType(CurType))
               return true
            }
          
            dispatch(addFilterType(CurType))

        }



        return (
            <ListGroup>
                {types.map(type =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        //active={type === choosedType}
                      //  onClick={() => SettingUpType(type)}
                    
                    >

                        

                        <InputGroup className="mb-3">
                        <InputGroup.Checkbox  onChange={() => SettingUpType(type)} aria-label="Checkbox for following text input" />
                        <InputGroup.Text>{type}</InputGroup.Text>
                        </InputGroup>
                    </ListGroup.Item>

                

                )}
                {/* {choosedType.map(type => <p>{type}</p>)} */}
            </ListGroup>
        );
    };

    export default TypeBar;