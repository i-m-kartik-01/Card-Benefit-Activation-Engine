import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// receipt-parser folder is outside backend
const SCRIPT_PATH = path.resolve(
    __dirname,
    "../../receipt-parser/donut_receipt_parser.py"
);

const PYTHON_PATH =
    process.env.PYTHON_PATH ||
    path.resolve(__dirname, "../../.venv/bin/python3");

class ReceiptParser {
    async parse(imagePath) {
        return new Promise((resolve, reject) => {
            const python = spawn(PYTHON_PATH, [
                SCRIPT_PATH,
                imagePath,
            ]);

            let stdout = "";
            let stderr = "";

            python.stdout.on("data", (data) => {
                stdout += data.toString();
            });

            python.stderr.on("data", (data) => {
                stderr += data.toString();
            });

            python.on("close", (code) => {
                if (code !== 0) {
                    return reject(
                        new Error(
                            `Donut parser failed:\n${stderr}`
                        )
                    );
                }

                try {
                    const result = JSON.parse(stdout);
                    resolve(result);
                } catch (err) {
                    reject(
                        new Error(
                            `Invalid JSON returned by Donut:\n${stdout}`
                        )
                    );
                }
            });

            python.on("error", reject);
        });
    }
}

export default new ReceiptParser();