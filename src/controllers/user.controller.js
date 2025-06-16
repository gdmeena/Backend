import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
   //get user details from frontend 
   // validation  -not empty
   // check if user already exists : username ,email
   // check for images ,check  for avtar
   // upload them to cloudinary
   // create user  object  -create entry in database
   // remove password  and refresh token filed from response
   //  check for user creation
   // return  res 
    


    const { username, email, password, fullname } = req.body
    console.log("email:", email);

// if(fullname === '' ){
//     throw new ApiError(400, 'Fullname is required');

if([username , email, password, fullname].some(field => field?.trim() === '')) {
        throw new ApiError(400, 'All fields are required');
    }
// if ([username, email, password, fullname].some(field => typeof field !== 'string' || field.trim() === '')) {
//     throw new ApiError(400, 'All fields are required and must be strings');
// }

 const userexist = await User.findOne({ $or: [{ username }, { email }] })
if(userexist) {
        throw new ApiError(409, 'Username or Email already exists');
    }
console.log("req.files:", req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
     coverImageLocalPath = req.files.coverImage[0].path;
    }
    
if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar image is required');
    }


    const avatar =  await uploadOnCloudinary(avatarLocalPath)
   const coverImage =  await uploadOnCloudinary(coverImageLocalPath);


if(!avatar)
    {
        throw new ApiError(500, 'Failed to upload avatar image');
    }


  const user = await  User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
        email,
        username: username.toLowerCase(),
        password,
           
        
        
        })


         const createUser = await User.findById(user._id).select(
            '-password -refreshToken'
         )
    if (!createUser) {
        throw new ApiError(500, 'Something went wrong while registering user');
    }

return res.status(201).json(
    new ApiResponse(200, createUser, 'User registered successfully')
)


  });


export { registerUser };


