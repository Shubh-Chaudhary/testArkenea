const multer = require('multer');
const Users = require('./userModel');


export default class UserController {

    static getUsers = ((req, res) => {
        Users.findAll().then(users => {
            res.send(200).json({
                status: 200,
                message: "User List.",
                data: users
            })
        }).catch(err => {
            res.send(500).json({
                status: 500,
                message: err.message,
                data: []
            })
        })
    })
    
    static getUserDetails = ((req, res) => {
    
        const reqParams = req.params;
    
        Users.findOne({ id: reqParams.userId }).then(user => {
            res.send(200).json({
                status: 200,
                message: "User Details.",
                data: user
            })
        }).catch(err => {
            res.send(500).json({
                status: 500,
                message: err.message,
                data: {}
            })
        })
    })
    
    static create = ((req, res) => {
    
        const reqBody = req.body;
        
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "./profileImages")
            },
            filename: () => {
                cb(null, `${file.fieldName}_${reqBody.mobile}.${mime.extension(file.mimetype)}`)
            }
        })
        
        const uploadImage = multer({
            storage: storage,
            limit: { fileSize: 1*1000*1000 }
        }).single('profileImage');

        uploadImage(req, res, (err) => {
            if(err) return false;

            reqBody.profileImage = req.file.path;
        })

        Users.create(reqBody, (err, user) => {
            if(err) {
                res.send(500).json({
                    status: 500,
                    message: err.message,
                    data: {}
                })
            }
    
            res.send(200).json({
                status: 200,
                message: "User created successfully.",
                data: user
            })
        })
    })
    
    static update = ((req, res) => {
    
        const reqBody = req.body;
        const reqParams = req.params;
    
        Users.findOneAndUpdate(
            { id : reqParams.userId }, 
            reqBody, 
            (err, user) => {
                if(err) {
                    res.send(500).json({
                        status: 500,
                        message: err.message,
                        data: {}
                    })
                }
    
                res.send(200).json({
                    status: 200,
                    message: "User updated successfully."
                })
            })
    })
    
    static delete = ((req, res) => {
    
        const reqParams = req.params;
    
        Users.findOneAndDelete(
            { id : reqParams.userId },
            (err, user) => {
                if(err) {
                    res.send(500).json({
                        status: 500,
                        message: err.message,
                        data: {}
                    })
                }
    
                res.send(200).json({
                    status: 200,
                    message: "User deleted successfully."
                })
            })
    })
}
