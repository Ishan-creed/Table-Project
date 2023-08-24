import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// const url = "mongodb+srv://myUser:user12345@cluster0.kew2vk8.mongodb.net/TableSample?retryWrites=true&w=majority";
const Connection = () => {
 
    mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@cluster0.wk0dk.mongodb.net/tableSample?retryWrites=true&w=majority`).then(()=>{
      console.log("Connection successfull");
  }).catch((e)=>{
      console.log(e);
  });

};

export default Connection;
