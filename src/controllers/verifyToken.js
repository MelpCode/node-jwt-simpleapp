const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const token = req.headers['x-acccess-token'];
    if(!token){
        return res.status(401).send({
            auth:false,
            message:'No token provided'
        })
    }
    const decoded = jwt.verify(token,process.env.SECRET)

    req.userId = decoded.id
    next();
}


module.exports = verifyToken;