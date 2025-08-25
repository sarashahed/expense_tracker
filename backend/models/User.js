const mongoose = require('mongoose');

const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
    fullName: { type: String, required: true },  
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true},
    profileURL: { type: String, default:" "},
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) 
        return next();
    this.password = await bycrypt.hash(this.password, 10);
    next();
   });

   // compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bycrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);