const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authCtrl = {}

authCtrl.signUp = async (req,res,next)=>{
    const {username,email,password} = req.body;

    if(username && email && password){
        const newUser = new User({
            username,email,password
        })
        newUser.password = await newUser.encryptPassword(newUser.password)
        await newUser.save()

        const token = jwt.sign({id:newUser._id},
            process.env.SECRET,{expiresIn:60*60*24});

        res.json({message:'User Saved Successfully',auth:true,token})

    }else{
        res.status(402).json({message:'Complete all the fields'})
    }
} 

authCtrl.signIn = async (req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(404).send("This email doesn't exit");
    }
    const validPassword = await user.validatePassword(password);
    if(!validPassword){
        return res.status(404).json({auth:false,token:null})
    }
    const token = jwt.sign({id:user._id},process.env.SECRET,{
        expiresIn:60*60*24
    })
    res.json({auth:true,token:token})
}



authCtrl.profile = async (req,res,next)=>{
    const user = await User.findById(req.userId,{password:0});
    if(!user){
        return res.status(404).send('Not user Found');
    }
    res.json({user:user})
}

module.exports = authCtrl;