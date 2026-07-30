import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadTransaction } from "../controllers/transactionController.js";
import Transaction from "../models/transactionModel.js";
import Claim from "../models/Claim.js";

const router = express.Router();

/**
 * POST /api/transactions/upload
 * Upload a receipt image and process it.
 */
router.post(
    "/upload",
    upload.single("receipt"),
    uploadTransaction
);

/**
 * GET /api/transactions
 * Get all transactions
 */
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.json({ success: true, data: transactions });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

/**
 * GET /api/transactions/:id
 * Get transaction by ID with claims
 */
router.get("/:id", async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        const claims = await Claim.find({ transaction: transaction._id });

        res.json({ success: true, data: { ...transaction.toObject(), claims } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;