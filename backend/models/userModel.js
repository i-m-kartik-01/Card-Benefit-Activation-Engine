import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    name: String,

    refreshToken: String,

    accessToken: String

});

export default mongoose.model("User", userSchema);