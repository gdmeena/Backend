import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
   username:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
   },
   
   email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
   },
   
   fullname:{
    type: String,
    required: true,
    trim: true,
    index: true
   },
   
   avatar:{
    type: String,
    required: true,
   },
    coverImage:{
    type: String,
    
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref: 'Video',
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        
    },
    refreshToken:{
        type: String,
       
    }
}, { timestamps: true }
)

userSchema.pre('save', async function(next){
    if(this.isModified('password') ) return next();
    // Hash the password before saving
    this.password = await bcrypt.hash(this.password, 10);