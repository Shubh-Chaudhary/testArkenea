// import 'express' from 'express';
const UserController = require('./userController');

const express = require('express');
const app = express();
const router = express.Router();

app.use(router);

// define all routes
router.get('/health-check', (req, res) => {
    res.send('Node server is working properly');
})

router.get('/users', UserController.getUsers);
router.get('/user/:userId', UserController.getUserDetails);
router.post('/user', UserController.create);
router.put('/user/:userId', UserController.update);
router.delete('/user/:userId', UserController.delete);

// create http server
app.listen('3000', () => {
    console.log('Server is listening at port 3000');
})