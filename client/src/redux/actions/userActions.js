
import axios from "axios";




export const login = (userId, token, username)  => async (dispatch) => {
	
	dispatch({ type: "LOGIN", payload:{userId, token, username}});
};


export const logout = ()  => async (dispatch) => {
	dispatch({ type: "LOGOUT"});
};


export const update = ()  => async (dispatch) => {
	dispatch({ type: "UPDATE_LOGIN_DATA"});
};