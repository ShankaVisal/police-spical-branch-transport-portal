import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     email:{
          type : String,
          required: true,
          unique : true
     },
     password : {
          type : String,
          required: true
     },
     firstName : {
          type : String,
          required: true
     },
     lastName : {
          type : String,
          required: true
     },
     type : {
          type : String,
          required: true,
          default : "user"
     },
     
})

const User = mongoose.model("users",userSchema)

export default User