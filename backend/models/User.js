// const mongoose = require("mongoose")

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true},
//     age: { type: Number, required: true}
//   });
  
// module.exports = mongoose.model('User', userSchema);


// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

userSchema.pre("save", async function(next){
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next;
})

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}



// userSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', userSchema);
module.exports = User;
