import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {


    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ) {
        return res.status(400).json({ message: "all rquire" });
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

    } catch (err) {
                res.status(500).json({ message: err.message})
    }


};