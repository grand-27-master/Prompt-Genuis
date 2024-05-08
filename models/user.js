import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        match: [/^[a-zA-Z0-9]+$/, "Username is invalid"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"],
    },
    image: {
        type: String
    }
    });


const User= models.User || model("User", userSchema);
export default User;