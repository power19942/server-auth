const jwt = require('jwt-simple');
const config = require('./../config');
const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub:user.id,iat:timestamp},config.secret);
}
exports.signIn = function (req,res,next) {
    res.send({token:tokenForUser(req.user)});
};

exports.signUp = function (req,res,next) {
    console.log(req.body);
    const email= req.body.email;
    const password= req.body.password;
    if(!email || !password){
        return res.status(422).send({error:'You must provide email and password'})
    }
    User.findOne({email:email},(err,existingUser)=>{
        //if user exists
        if(err){return next(err)}
        if (existingUser){
            return res.status(422).send({error:'Email is in use'});
        }
        //if user not exists
        //create record in memory
        const user = new User({
            email:email,
            password:password
        });
        // save the user
        user.save((err)=>{
            if (err){return next(err);}
            res.json({token:tokenForUser(user)});
        });
    });
};

