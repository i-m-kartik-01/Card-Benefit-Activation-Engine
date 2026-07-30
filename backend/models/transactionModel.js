import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },

        quantity: {
            type: Number,
            default: 1
        },

        price: {
            type: Number,
            default: 0
        }

    },
    {
        _id: false
    }
);

const BenefitSchema = new mongoose.Schema(
    {

        benefitType: String,

        eligible: Boolean,

        amountEligible: Number,

        estimatedPayout: Number,

        priority: Number,

        nextAction: String,

        proofRequired: [String],

        metadata: mongoose.Schema.Types.Mixed

    },
    {
        _id: false
    }
);

const TransactionSchema = new mongoose.Schema(

    {

        merchant: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        subtotal: {
            type: Number,
            default: 0
        },

        tax: {
            type: Number,
            default: 0
        },

        currency: {
            type: String,
            default: "USD"
        },

        receiptNumber: String,

        transactionDate: Date,

        receiptImage: String,

        category: String,

        merchantType: String,

        confidence: {
            type: Number,
            default: 0
        },

        classificationSource: {
            type: String,
            default: "ai"
        },

        cardType: {
            type: String,
            default: "amex_platinum"
        },

        items: {
            type: [ItemSchema],
            default: []
        },

        benefits: {
            type: [BenefitSchema],
            default: []
        },

        claims: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Claim"
            }
        ],

        /* ---------- Debug Information ---------- */

        aiReasoning: {
            type: [String],
            default: []
        }

    },

    {
        timestamps: true
    }

);

const Transaction =
    mongoose.models.Transaction ||
    mongoose.model(
        "Transaction",
        TransactionSchema
    );

export default Transaction;