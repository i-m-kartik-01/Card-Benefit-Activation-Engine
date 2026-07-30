import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

class TransactionAnalyzer {

    async analyze(donutOutput) {

        const prompt = `
You are an expert receipt analysis AI.

You will receive the raw JSON output from a DONUT OCR model.

Your task is to:

1. Extract receipt information.
2. Normalize the values.
3. Classify the merchant.
4. Estimate confidence.
5. Explain WHY you selected the category.

Return ONLY valid JSON.

Schema:

{
  "merchant": "",
  "amount": 0,
  "subtotal": 0,
  "tax": 0,
  "currency": "",
  "receiptNumber": "",
  "transactionDate": "",
  "items": [
    {
      "name": "",
      "quantity": 1,
      "price": 0
    }
  ],
  "category": "",
  "merchantType": "",
  "confidence": 0,
  "classificationSource": "ai",

  "reasoning": [
    ""
  ]
}

Rules:

- merchant = business/store name
- amount = final payable amount
- subtotal = amount before tax
- tax = tax amount
- currency = ISO code if possible
- receiptNumber = invoice/receipt/order number
- transactionDate = YYYY-MM-DD if possible
- quantity defaults to 1
- confidence between 0 and 1

If OCR is uncertain:

- Never invent values.
- Unknown strings -> ""
- Unknown numbers -> 0
- Unknown arrays -> []

Merchant Categories:

Travel
Dining
Shopping
Fuel
Grocery
Entertainment
Healthcare
Utilities
Online Services
Retail
Electronics
Department_Store
Furniture
Airline
Cruise
Train
Other

Merchant Types:

Restaurant
Coffee Shop
Hotel
Airline
Supermarket
Retail Store
Electronics Store
Fuel Station
Department Store
Furniture Store
Pharmacy
Online Marketplace

Reasoning Rules:

Return 2-4 short bullet explanations.

Example:

"reasoning":[
"Merchant identified as Best Buy.",
"Electronics products detected.",
"Retail purchase classified as electronics."
]

Return ONLY JSON.

DONUT OCR OUTPUT:

${JSON.stringify(donutOutput, null, 2)}
`;

        try {

            const completion =
                await groq.chat.completions.create({

                    model: "llama-3.3-70b-versatile",

                    temperature: 0.1,

                    response_format: {
                        type: "json_object",
                    },

                    messages: [

                        {
                            role: "system",
                            content:
                                "You are a receipt extraction assistant. Always return ONLY valid JSON."
                        },

                        {
                            role: "user",
                            content: prompt
                        }

                    ]

                });

            let response =
                completion.choices[0].message.content.trim();

            response = response
                .replace(/^```json/i, "")
                .replace(/^```/i, "")
                .replace(/```$/i, "")
                .trim();

            return JSON.parse(response);

        }
        catch (err) {

            console.error("Groq Error:");

            if (err.response?.data) {

                console.error(err.response.data);

            }
            else {

                console.error(err);

            }

            throw new Error("Failed to analyze receipt.");

        }

    }

}

export default new TransactionAnalyzer();