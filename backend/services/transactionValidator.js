
function validateTransaction(tx) {
    // Ensure numeric fields
    tx.amount = Number(tx.amount) || 0;
    tx.subtotal = Number(tx.subtotal) || 0;
    tx.tax = Number(tx.tax) || 0;

    // If amount is missing but subtotal + tax is available
    if (tx.amount === 0 && tx.subtotal > 0) {
        tx.amount = tx.subtotal + tx.tax;
    }

    // Prevent negative values
    tx.amount = Math.max(0, tx.amount);
    tx.subtotal = Math.max(0, tx.subtotal);
    tx.tax = Math.max(0, tx.tax);

    // Confidence should stay between 0 and 1
    tx.confidence = Math.min(1, Math.max(0, Number(tx.confidence) || 0));

    const categoryMap = {
        "Travel": "travel",
        "Shopping": "retail",
        "Dining": "restaurant",
        "Grocery": "grocery",
        "Fuel": "fuel",
        "Entertainment": "entertainment",
        "Healthcare": "healthcare",
        "Utilities": "utilities"
    };

    tx.category = categoryMap[tx.category] || tx.category.toLowerCase();

    return tx;
}

export default validateTransaction;