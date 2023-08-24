import { response } from "express";
import nodemailer from 'nodemailer';
import MyUser from "../models/model.user.js";


export const getUser = async (request,response)=>{;

    let data = request.body;

    try{
        let myData = await MyUser.find();

        if(data){
            response.status(200).json(myData);
            
        }else{
            response.status(400).json({message:"Entry not found"});
        }
    } catch(e){
        console.log(e);
        response.status(500).json({message:"Internal server error"});
    }

}

export const addUser = async (request, response) => {
    let data = request.body;  // Change req to request here

    let {formData} = request.body;
    console.log({formData});

    const exist = await MyUser.findOne({
        userId: data.userId,  // Change id to userId here
    });

    if (exist) {
        response.status(405).json("User already exists");
        return;
    }

    const newUser = new MyUser(formData);

    try {
        const savedUser = await newUser.save();
        response.status(200).json(savedUser);
    } catch (error) {
        response.status(500).json(error);
    }
};

export const updateUser = async (request,response)=>{

 let ID = request.query.id;
 let {formData}  = request.body;
 console.log({formData});

 console.log(ID);

 try{
    const existingEntry = await MyUser.findOne({userId:ID})
    existingEntry.name = {formData}.name;
    existingEntry.phone = {formData}.phone;
    existingEntry.email = {formData}.email;
    existingEntry.hobbies = {formData}.hobbies;

    const updatedEntry = await existingEntry.save();

    response.status(200).json(updatedEntry);
    console.log(updatedEntry);

 } catch(error){
    console.error('Error occurred while updating',error);
    response.status(500).json({error:'Failed to update the entry'});
 }

};

export const deleteUser = async (request,response)=>{

    let Id = request.query.id;
    console.log(Id);

    const exist = await MyUser.findOne({
        userId:Id
    });

    if(!exist){
        response.status(405).json("user does not exist");
        return;
    };

    try{

        let deletedUser = await MyUser.deleteMany(exist);
        if(deleteUser){
            response.status(200).json("Item deleted");
        }else{
            response.status(405).json("error deleting the inventory");
        }

    }catch(e){
        response.status(500).json(error);
    }

};
// for mailing services...

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '211552@juitsolan.in',
        pass: 'ishanverma@123'
    }
});

export const mail = async (req,res)=>{

    const data = req.body;

    const mailOptions = {
        from: '211552@juitsolan.in',
        to: 'info@redpositive.in',
        subject: 'Test',
        text: JSON.stringify(data)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });

}

