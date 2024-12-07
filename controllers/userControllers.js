import User from '../models/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();


export function postUsers(req, res) {
     const user = req.body;

     const password = user.password;
     const hashPassword = bcrypt.hashSync(password, 10);
     console.log(hashPassword);
     user.password = hashPassword;

     const newUser = new User(user)
     newUser.save().then(
          (result) => {
               res.json({
                    message: "user created sucessfully",
                    result : result
          })
     }).catch(() => {
          res.json({
               message: "user creation failed"
          })
     })
}

export function loginUser(req, res) {
     const credentials = req.body
     const password = credentials.password

     User.findOne({ email: credentials.email }).then(
          (user) => {
               if (user == null) {
                    res.status(404).json({
                         message: "User not found"
                    })
               } else{
                    const isPasswordValid = bcrypt.compareSync(password, user.password)
                    if (isPasswordValid == false) {
                         res.status(401).json({
                              message: "Invalid Password"
                         })
                    } else {

                         const Payload = {
                              id: user._id,
                              email: user.email,
                              firstName: user.firstName,
                              lastName: user.lastName,
                              type: user.type
                         };

                         const token = jwt.sign(Payload, process.env.JWT_KEY, { expiresIn: "48h" });

                         res.json({
                              message: "User found",
                              user: user,
                              token: token
                         })
                    }
               }
          }
     )
}

export function isAdmin (req){
     if(!req.user){
         return false
     }
     if(req.user.type !== "admin"){
         return false
     }
     return true
 }

 export function isCustomer (req){
     if(!req.user){
         return false
     }
     if(req.user.type !== "customer"){
         return false
     }
     return true
 }

