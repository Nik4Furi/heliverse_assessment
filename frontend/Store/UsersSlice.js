
import { createSlice } from '@reduxjs/toolkit'
import { Token } from '../src/GlobalFunctions';

const backend_url = import.meta.env.VITE_BACKEND_URL;
const userRoutes = 'api/users';

//---------- Create the slice for specific users
const UsersSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isAuthenticated: false,
        allUsers: [],
        currentPage: 1,
        totalPage: 1,
        allTeams: []
    },

    reducers: {
        setUserLoginRequest(state) {
            state.loading = true;
        },
        setUserLogin(state, action) {
            state.loading = false;
            state.user = action.payload.user;
            state.msg = action.payload.msg;
            state.success = true;
            state.isAuthenticated = true;
        },
        setUserLoginError(state, action) {
            state.loading = false;
            state.msg = action.payload;
            state.success = false;
        },

        //-------------------- Get the info of logged users
        //---------------- Set User Specific Stufff-------------------
        getUserRequest(state) {
            state.loading = true;
        },
        setUser(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logoutUser(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.success = true;
            state.allUsers = [];
            state.msg = "You are logout successfully"
            state.token = null;
        },
        getUserError(state, action) {
            state.loading = false;
            state.success = false;
            state.token = null;
            state.msg = action.payload;
        },

        //---------------- Register User Specific Stufff-------------------
        registerUserRequest(state) {
            state.loading = true;
        },
        registerUser(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.user = action.payload.user;
        },
        registerUserError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },

        //--------------------- Users pagination data stuff
        fetchUsersRequest(state) {
            state.loading = true;
        },
        fetchAllUsers(state, action) {
            state.loading = false;
            state.allUsers = action.payload.users;
            state.totalPage = action.payload.totalPages;
            state.currentPage = action.payload.page;
            state.pageLastLimit = action.payload.pageLastLimit
        },
        fetchUsersError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },

        //-------------- update the profile 
        //--------------- Delete the users
        updateProfileRequest(state) {
            state.loading = true;
        },
        updateProfile(state, action) {
            state.loading = false;
            state.user = action.payload.user;
            state.msg = action.payload.msg;
            state.success = true;
        },
        updateProfileError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },

        //--------------- Delete the users
        deleteUsersRequest(state) {
            state.loading = true;
        },
        deleteAllUsers(state, action) {
            state.loading = false;
            state.allUsers = state.allUsers.filter(user => user?._id !== action.payload._id);
            state.msg = action.payload.msg;
            state.success = true;
        },
        deleteUsersError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },

        //----------------- Fetch all the teams by the users
        fetchTeamRequest(state) {
            state.loading = true;
        },
        fetchAllTeam(state, action) {
            state.loading = false;
            state.success = true;
            state.allTeams = action.payload;
            // state.allTeams.push(action.payload.team);
        },
        fetchTeamError(state, action) {
            state.loading = false;
            state.msg = action.payload;
            state.success = false;
        },

        //----------------- Create the teams
        createTeamRequest(state) {
            state.loading = true;
        },
        createTeam(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            // state.allTeams.push(action.payload.team);
        },
        createTeamError(state, action) {
            state.loading = false;
            state.msg = action.payload;
            state.success = false;
        },



        //------------------------- Clear all the stuff from the slice
        clearUserError(state) {
            state.msg = null
            state.success = null;
            state.loading = null;
        }


    }
})

export const { setUserLogin, setUserLoginError, setUserLoginRequest, clearUserError,
    getUserError, getUserRequest, setUser, logoutUser,
    registerUser, registerUserError, registerUserRequest,
    fetchAllUsers, fetchUsersError, fetchUsersRequest,
    createTeam, createTeamError, createTeamRequest,
    fetchAllTeam, fetchTeamError, fetchTeamRequest,
    deleteUsersError, deleteAllUsers, deleteUsersRequest,
    updateProfile, updateProfileError, updateProfileRequest } = UsersSlice.actions
export default UsersSlice.reducer;

//------------------- Create the middlewares thunks request
const url = `${backend_url}/${userRoutes}`;

//------------------ Login the user
export const LoginUser = (formData) => async dispatch => {
    dispatch(setUserLoginRequest());

    try {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        };

        const res = await fetch(`${url}/login`, options);
        const data = await res.json();

        if (data?.success === false) {
            dispatch(setUserLoginError(data?.msg));
            return;
        }
        const user = data?.users, msg = data?.msg;

        //-------------- Set the token of the users
        localStorage.setItem('token', data?.token);

        dispatch(setUserLogin({ user, msg }));

    } catch (error) { dispatch(setUserLoginError(error)) }
}

//----------- Get the info of logged users
export const getUser = () => async dispatch => {

    dispatch(getUserRequest());

    try {
        const options = {
            headers: {
                'auth-token': Token
            }
        };

        const res = await fetch(`${url}/getUser`, options);
        const data = await res.json();

        if (data?.success === true) {
            dispatch(setUser({ user: data?.user }));
            // dispatch(setUser({ user: data.user, msg: data.msg }));
        }
        else dispatch(getUserError(data.msg));

    } catch (error) {
        dispatch(getUserError(error));
    }
};


//---------- Function to submit the form data or can say login the users 
export const handleRegisterUser = (formData) => async dispatch => {

    dispatch(registerUserRequest());

    //-------------Now call the api to register the new user
    try {
        const options = {
            method: 'POST',
            body: formData
        };

        const res = await fetch(`${url}/register`, options);
        const data = await res.json();

        if (data.success === false) {
            dispatch(registerUserError(data.msg));
            return;
        }

        const user = data?.user, msg = data?.msg;
        localStorage.setItem('token', data?.token);

        dispatch(registerUser({ user, msg }));

    } catch (error) {
        dispatch(registerUserError(error));
    }
}

//-------------- Fetch the users by the pagination

//---------- Function to submit the form data or can say login the users 
export const handleFetchUsers = (page = 1, name = '', domain = '', gender = '', available = '') => async dispatch => {

    dispatch(fetchUsersRequest());

    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Token
            }
        };


        const res = await fetch(`${url}/fetchAll?page=${page}&name=${name}&domain=${domain}&gender=${gender}&availability=${available}`, options);
        const data = await res.json();

        if (data.success === false) {
            dispatch(fetchUsersError(data.msg));
            return;
        }
        const users = data?.users, totalPages = data?.totalPages, pageLastLimit = data?.pageLastLimit;
        dispatch(fetchAllUsers({ users, page, totalPages, pageLastLimit }));

    } catch (error) {
        dispatch(fetchUsersError(error));
    }
}

//------------ func to update users details
export const handleUpdateUser = (formData) => async dispatch => {

    dispatch(updateProfileRequest());

    try {
        const options = {
            method: 'PUT',
            headers: {
                'auth-token': Token
            },
            body: formData
        };


        const res = await fetch(`${url}/update`, options);
        const data = await res.json();

        if (data.success === false) {
            dispatch(updateProfileError(data.msg));
            return;
        }
        const user = data?.user, msg = data?.msg;
        dispatch(updateProfile({ user, msg }));

    } catch (error) {
        dispatch(updateProfileError(error));
    }
}

//---------- Function to submit the form data or can say login the users 
export const handleDeleteUsers = (_id) => async dispatch => {

    dispatch(deleteUsersRequest());

    try {
        const options = {
            method: 'DELETE',
            headers: {
                'auth-token': Token
            }
        };


        const res = await fetch(`${url}/delete/${_id}`, options);
        const data = await res.json();

        if (data.success === false) {
            dispatch(deleteUsersError(data.msg));
            return;
        }
        const msg = data?.msg;
        dispatch(deleteAllUsers({ _id, msg }));

    } catch (error) {
        dispatch(deleteUsersError(error));
    }
}

//---------- Function to create a new team
export const handleCreateTeam = (formData) => async dispatch => {

    dispatch(createTeamRequest());
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Token
            },
            body: JSON.stringify(formData)
        };


        const res = await fetch(`${url}/createTeam`, options);
        const data = await res.json();

        if (data.success === false) {
            dispatch(createTeamError(data.msg));
            return;
        }
        const team = data?.team, msg = data?.msg;
        dispatch(createTeam({ team, msg }));

    } catch (error) {
        dispatch(createTeamError(error));
    }
}


//---------- Function to fetch all the teams
export const handleFetchTeams = () => async dispatch => {

    dispatch(fetchTeamRequest());
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': Token
            }
        };


        const res = await fetch(`${url}/fetchTeams`, options);
        const data = await res.json();

        if (data.success === false) {
            dispatch(fetchTeamError(data.msg));
            return;
        }
        dispatch(fetchAllTeam(data?.teams));

    } catch (error) {
        dispatch(fetchTeamError(error));
    }
}