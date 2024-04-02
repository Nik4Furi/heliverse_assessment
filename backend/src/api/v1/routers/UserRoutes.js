const Routers = require('express').Router();


//--------------------------- Middlewares Specific Stuff ---------------------------------X
const isAuthenticated = require('../middlewares/isAuthenticated'); //fetch user by the token
const UploadFile = require('../middlewares/UploadFile'); //Upload files

//------------------ Controllers Specific Stuff-------------------------X
const AuthController = require('../controllers/AuthControllers');
const UsersControllers = require('../controllers/UsersControllers');


//----------------------- INitizlalzing auth apis's routes here -------------------X
Routers.post('/register', UploadFile, AuthController().Register); //Register the users ,using POST '/api/user/register'
Routers.post('/login', AuthController().Login); //login the users ,using POST '/api/user/login'
Routers.get('/getUser', isAuthenticated, AuthController().getUser); //get info of login users ,using GET '/api/user/getUser'

//------------- Initializing the users controlled apis
Routers.get('/fetchAll',isAuthenticated,UsersControllers().FetchUsers); //fetch all the users via pagination, using GET '/api/users/fetchAll?page=&gender=&domain&availablity'
Routers.get('/fetch/:_id',isAuthenticated,UsersControllers().FetchUser); //fetch a user, using GET '/api/users/fetch/:id'
Routers.post('/create',isAuthenticated,UploadFile,UsersControllers().CreateUser); //Create the user, using POST '/api/users/create'
Routers.put('/update',isAuthenticated,UploadFile,UsersControllers().UpdateUser); //update the user, using PUT '/api/users/update'
Routers.delete('/delete/:_id',isAuthenticated,UsersControllers().DeleteUser); //update the user, using PUT '/api/users/update'

//---------------- Initialize the team specific stuff
Routers.get('/fetchTeams',isAuthenticated,UsersControllers().FetchTeam); //Fetch all teams of the users, using GET '/api/users/fetchTeams'
Routers.get('/fetchATeam/:_id',isAuthenticated,UsersControllers().FetchATeam); //Fetch all teams of the users, using GET '/api/users/fetchATeams/:_id'
Routers.post('/createTeam',isAuthenticated,UsersControllers().CreateTeam); //Create new teams of the users, using GET '/api/users/createTeams'

module.exports = Routers