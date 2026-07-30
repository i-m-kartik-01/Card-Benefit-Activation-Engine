import mongoose from "mongoose";

import connectDB from "./connection.js";
import Transaction from "./models/transactionModel.js";

import receiptParser from "./services/receiptParser.js";
import transactionAnalyzer from "./services/transactionAnalyzer.js";
import validateTransaction from "./services/transactionValidator.js";
import RulesEngine from "./services/RulesEngine.js";

async function main() {

    try {

        // ---------------------------------------
        // Connect to MongoDB
        // ---------------------------------------

        await connectDB();

        // ---------------------------------------
        // STEP 1 : Receipt Parsing
        // ---------------------------------------

        console.log("\n==============================");
        console.log("STEP 1 : Parsing Receipt");
        console.log("==============================");

        const donutOutput = await receiptParser.parse(
            "../receipt-parser/receipt.jpg"
        );

        console.dir(donutOutput, { depth: null });

        // ---------------------------------------
        // STEP 2 : AI Extraction
        // ---------------------------------------

        console.log("\n==============================");
        console.log("STEP 2 : AI Extraction");
        console.log("==============================");

        const transaction = validateTransaction(
            await transactionAnalyzer.analyze(donutOutput)
        );

        console.dir(transaction, { depth: null });

        // ---------------------------------------
        // STEP 3 : Rules Engine
        // ---------------------------------------

        console.log("\n==============================");
        console.log("STEP 3 : Rules Engine");
        console.log("==============================");

        const engine = new RulesEngine("amex_platinum");

        const benefits = engine.evaluate(transaction);

        console.dir(benefits, { depth: null });

        // ---------------------------------------
        // STEP 4 : Generate Claims
        // ---------------------------------------

        console.log("\n==============================");
        console.log("STEP 4 : Generate Claims");
        console.log("==============================");

        // Replace this with your claimGenerator later
        const claims = benefits.map((benefit) => ({

            benefitType: benefit.benefitType,

            status: "Pending",

            estimatedAmount: benefit.estimatedPayout,

            generatedAt: new Date()

        }));

        console.dir(claims, { depth: null });

        // ---------------------------------------
        // STEP 5 : Save to MongoDB
        // ---------------------------------------

        console.log("\n==============================");
        console.log("STEP 5 : Saving to MongoDB");
        console.log("==============================");

        const savedTransaction = await Transaction.create({

            ...transaction,

            benefits,

            claims,

            receiptImage: "receipt.jpg"

        });

        console.log("\n✅ Transaction Saved Successfully!");
        console.log("MongoDB ID:", savedTransaction._id);

        console.log("\n==============================");
        console.log("Pipeline Completed Successfully");
        console.log("==============================");

    } catch (err) {

        console.error("\n❌ Pipeline Failed");
        console.error(err);

    } finally {

        await mongoose.disconnect();
        console.log("\n🔌 MongoDB Disconnected");

    }
}

main();