import mongoose from "mongoose";    

const familySchema = new mongoose.Schema({
  name: {type: String, required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

export const Family = mongoose.model('Family', familySchema);