import RulesEngine from "./services/RulesEngine.js";

const transaction = {
    merchant: "Apple",
    amount: 1500,
    subtotal: 1400,
    tax: 100,
    currency: "USD",

    category: "electronics",

    merchantType: "Retail Store",

    confidence: 0.98
};

const engine = new RulesEngine("amex_platinum");

const benefits = engine.evaluate(transaction);

console.dir(benefits, { depth: null });