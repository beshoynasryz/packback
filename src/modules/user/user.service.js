import User from "./user.model";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";



export const createUser = expressAsyncHandler(async (req, res, next) => {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone) {
            return next(new Error("All fields are required"));   
        }
        const existingUser = User.findOne({email})
        if( existingUser ){
            return res.status(400).send({message:"User is already exists"})
        }
        const hashedPassword = bcrypt.hash(10, password)
        
        const user = await User.create({ name, email, password:hashedPassword, phone, role });
        const {password: _,...userWithoutPassowrd } = user.toObject()
   

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userWithoutPassowrd
        });


})

export const getUserById = expressAsyncHandler(async (req, res, next) => {
     

})
