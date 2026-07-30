import dotenv from "dotenv";
dotenv.config();

import receiptParser from "./services/receiptParser.js";
import transactionAnalyzer from "./services/transactionAnalyzer.js";

async function test() {
    try {
        const donut = await receiptParser.parse(
            "../receipt-parser/receipt.jpg"
        );

        console.log("\n========== DONUT OUTPUT ==========\n");
        console.dir(donut, { depth: null });

        const transaction =
            await transactionAnalyzer.analyze(donut);

        console.log("\n========== GEMINI OUTPUT ==========\n");
        console.dir(transaction, { depth: null });

    } catch (err) {
        console.error(err);
    }
}

test();