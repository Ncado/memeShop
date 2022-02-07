


let UserAuthData = {
	token: 9999,
    userId: 99999,
    isAuthenticated: false,
    username: "..."
}

const storageName = 'userData'
export const UserAuthReducer = (state = UserAuthData, action) => {
	switch (action.type) {
		case "LOGIN":
            localStorage.setItem(storageName, JSON.stringify({
                userId: action.payload.userId, token: action.payload.token, userName:  action.payload.username, bliat: 11111
              }))
			return {...state, token: action.payload.token,
                 userId: action.payload.userId,
                 username: action.payload.username,
                 isAuthenticated :true
                 };
		case "LOGOUT":
            localStorage.removeItem(storageName)
			return {...state,
                 token: null,
                 userId:null,
                 username:null,
                 isAuthenticated:false
            };
		case "UPDATE_LOGIN_DATA":
            const data = JSON.parse(localStorage.getItem(storageName))

             if (data && data.token) {
                return{...state, token: data.token,
                 userId: data.userId,
                 username: data.userName,
                 isAuthenticated :true
                };
             }
			return state;
		default:
			return state;
	}
};

