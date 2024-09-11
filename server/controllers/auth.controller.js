import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {


    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ) {
        next(errorHandler(400,'all fields are requried'))
    }

    const hashPassword = bcrypt.hashSync(password,10);


    const newUser = new User({
        username,
        email,
        password:hashPassword,
    });

    try {
        await newUser.save();
        res.json('sign up doen')

    } catch (error) {
         next(error)
    }


};