import Transaction from "../models/transactionModel.js";
import receiptParser from "../services/receiptParser.js";
import transactionAnalyzer from "../services/transactionAnalyzer.js";
import validateTransaction from "../services/transactionValidator.js";
import RulesEngine from "../services/RulesEngine.js";
import claimGenerator from "../services/claimGenerator.js";

export const uploadTransaction = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Receipt image is required."
            });
        }

        // Step 1: OCR
        const donutOutput = await receiptParser.parse(req.file.path);

        // Step 2: AI Analysis
        const aiOutput = await transactionAnalyzer.analyze(donutOutput);

        // Step 3: Normalize
        const transactionData = validateTransaction(aiOutput);

        // Step 4: Rules Engine
        const rulesEngine = new RulesEngine(req.body.cardType);
        const benefits = rulesEngine.evaluate(transactionData);

        // Step 5: Save Transaction
        const transaction = await Transaction.create({
            ...transactionData,
            benefits,
            receiptImage: req.file.filename,
            aiReasoning: transactionData.reasoning || []
        });

        // Step 6: Generate Claims
        const claims = await claimGenerator.generate(
            transaction,
            benefits
        );

        transaction.claims = claims;
        await transaction.save();

        return res.status(201).json({
            success: true,
            transaction,
            claims,

            // 👇 Used only for UI / demo
            debug: {
                donutOutput,
                aiOutput,
                normalizedTransaction: transactionData,
                benefits
            }
        });

    } catch (error) {

        console.error("Upload Error:");
        console.error(error);
        console.error(error.stack);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};