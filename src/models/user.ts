import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
        minlength: 5,
    },
    image: {
        type: String,
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
