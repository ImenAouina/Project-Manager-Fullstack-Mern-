const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports = {

    register: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email : req.body.email})
            if(potentialUser){
                res.status(400).json({message : 'email already exist'})
            }else{
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({id : newUser._id, email : newUser.email},secret , {expiresIn : '1d'})
                res.cookie('userToken',userToken, {httpOnly : true})
                .json({message : 'success registration!' , user : newUser})
            }
        }catch(err){
            console.log(err)
            return res.status(400).json(err) 
        }
    },
    login: async (req, res)=>{
            try {
                const userFromDB = await User.findOne({email:req.body.email});
                if(userFromDB){
                    const passwordMatch = await bcrypt.compare(req.body.password, userFromDB.password)
                    if(passwordMatch){
                        const userToken = jwt.sign({id : userFromDB._id, email : userFromDB.email},secret , {expiresIn : '1d'})
                        res.cookie('userToken',userToken, {httpOnly : true})
                        .json({message : 'login with success' , user : userFromDB})
                    }else {
                        res.status(400).json({ error: "Invalid login attempt" })
                    }
                } else {
                    res.status(400).json({ error: "Invalid login attempt" })
                }        
        } catch(error){
            console.log(error)
            return res.status(400).json(error)
        }
    },
    logout: (req, res) => {
        res.clearCookie('userToken');
        res.json({ msg: "logout!" });
    },

}