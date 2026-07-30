// models/Card.js

import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
{
    cardKey: String,

    cardName: String,

    issuer: String,

    annualFee: Number
});

export default mongoose.model("Card", CardSchema);