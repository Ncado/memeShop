import React from 'react'

import {Switch, Route,Redirect} from 'react-router-dom'
//import AuthPage from './pages/Auth/AuthPage'
import Shop from './pages/Shop'
import Basket from './pages/Basket'
import DetailPage from './pages/DetailPage'
import Favourites from './pages/Favourites'




export const useRoutes = () =>{

        return(
            <Switch>
                <Route path="/shop" exact>
                    <Shop />
                </Route>
                <Route path="/basket" exact>
                    <Basket />
                </Route>
                <Route path="/favourites" exact>
                    <Favourites />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                {/* <Redirect to="/shop" /> */}
            </Switch>
     
        )
    }

