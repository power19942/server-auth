const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//define model
const userSchema = new Schema({
    email:{type:String,unique:true,lowercase:true},
    password:String
});
// on save hook encrypt password

userSchema.pre('save',function (next){
    var user = this;

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err){return next(err)}
                user.password = hash;
                next();
            });
        });

});
// candidatePassword = the submitted password from user
userSchema.methods.comparePassword = function(candidatePassword,callback){
    bcrypt.compare(candidatePassword,this.password,(err,isMatch)=>{
        if(err){return callback(err);}
        callback(null,isMatch);
    });
};
// create model class
const ModelClass = mongoose.model('user',userSchema);
// export model
module.exports = ModelClass;