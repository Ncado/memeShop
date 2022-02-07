import React, { useContext, useState } from 'react';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import { Button, Col } from "react-bootstrap";
import AuthLogInModal from './authLogInModal';
import FavModal from './favModal'
import AuthSignInModal from './authRegModal'
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {getAllFavouriteArts,getArts} from "../redux/actions/artActions"
import { logout } from '../redux/actions/userActions';
import Search from './Search'
import axios from "axios";

const NavBar = () => {
    const [LogInVisible, LogInSetVisible] = useState(false)
    const [SignInVisible, SignInSetVisible] = useState(false)
    const [FavouriteVisible, setFavouriteVisible] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    let auth = useSelector(state => state.userAuth.isAuthenticated)
    let token = useSelector(state => state.userAuth.token)


    let page = useSelector(state => state.filtersArt.page)
    let filterByPrise = useSelector(state=>state.sortsArts.sortByPrise)
    let filterByTitle = useSelector(state=>state.sortsArts.sortByTitle)
      let choosedType = useSelector(state => state.filtersArt.choosedType)
      let choosedFirstMention = useSelector(state => state.filtersArt.choosedFirstMention)

    const userName = useSelector(state => state.userAuth.username)

    return (
        <Navbar bg="dark" variant="dark">

            <Container>
                <Col md={6}>
                    <NavLink style={{ color: 'white' }} onClick={()=>dispatch(getArts(choosedFirstMention,choosedType,6,page,filterByPrise,filterByTitle))} to={"/shop"}>КупиДевайс</NavLink>
                </Col>
                <Nav className="ml-auto" style={{ color: 'white' }}>
                </Nav>
                <Col md={2} >
                    <Search />
                </Col>
                {auth ?
                    <Col md={2}  >


                        Привіт, {userName}
                    </Col>
                    :
                    <div></div>
                }
                {auth ?
                    <Col md={1}  >

                    <NavLink style={{ color: 'white' }} onClick={()=>dispatch(getAllFavouriteArts(token))} to={"/favourites"}>Улюблені</NavLink>

                        
                    </Col>
                    :
                    <div></div>


                }
                <Col md={2}>
                    {auth ?


                        <Col>
                            <Button
                                variant={"outline-dark"}
                                className="mt-4 p-2"
                                onClick={() => dispatch(logout())}
                            >
                                Log out
                            </Button>
                        </Col>

                        :
                        <div>

                            <Col>
                          
                                <Button
                                    variant={"outline-dark"}
                                    className="mt-4 p-2"
                                    onClick={() => LogInSetVisible(true)}
                                >
                                    Log in
                                </Button>

                                <Button
                                    variant={"outline-dark"}
                                    className="mt-4 p-2"
                                    onClick={() => SignInSetVisible(true)}
                                >
                                    Sign in
                                </Button>
                               
                            </Col>
                        </div>

                    }
                </Col>
                <FavModal  show={FavouriteVisible} onHide={() => setFavouriteVisible(false)}/>
                <AuthLogInModal show={LogInVisible} onHide={() => LogInSetVisible(false)} />
                <AuthSignInModal show={SignInVisible} onHide={() => SignInSetVisible(false)} />

            </Container>
        </Navbar>

    );
};

export default NavBar;