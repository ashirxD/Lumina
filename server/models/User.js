import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type :String, required: true},
  email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true}, 
    isVerified: {type: Boolean, default: false},
    role: {
      type: String,
      enum: ['gurardian', 'child', 'admin'],
        default: 'gurardian'
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

export const User = mongoose.model('User', userSchema);
