import mongoose from "mongoose";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
  password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
  },
    email: {
        type: String,
        match: [emailRegexp, 'Invalid email format'],
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

export default User;