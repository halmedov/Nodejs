const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async(req,res) => {
  try{
    const { username, email, password } = req.body
    const user = await Auth.findOne({email})
    const user_name =  await Auth.findOne({username})

    if(user){
      return res.status(422).json({message: "This email already used!"})
    }
    if(user_name){
      return res.status(422).json({message: "This username already used!"})
    }

    if(password.length <8){
      return res.status(400).json({message: "Short password"})
    }
    const passwordHash = await bcrypt.hash(password,12)
    const newUser = await Auth.create({username, email, password: passwordHash})
    
    const userToken = await jwt.sign({id: newUser.id}, process.env.SECRET_TOKEN, {expiresIn:"1h"})

    res.status(201).json({
      status : "OK",
      newUser,
      userToken
    })
  }catch(err){
    return res.status(500).json({message: err.message})
  }
}

const login = async(req,res) => {
  try {
    const {email,password} = req.body;
    const user = await Auth.findOne({email});

    if(!user){
      return res.status(400).json({message : "Wrong Email!"})
    }
    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
      return res.status(400).json({message : "Wrong Password!"})
    }
    const token = await jwt.sign({id: user.id}, process.env.SECRET_TOKEN, {expiresIn:"1h"});

    res.status(200).json({
      status : "OK",
      user,
      token
    })
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}

module.exports = {
      register,
      login
}