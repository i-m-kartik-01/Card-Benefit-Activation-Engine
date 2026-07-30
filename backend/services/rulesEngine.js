import cardTerms from "../data/cardTerms.json" with { type: "json" };

class RulesEngine {

    constructor(cardType = "amex_platinum") {

        if (!cardTerms[cardType]) {
            throw new Error(`Unknown card type: ${cardType}`);
        }

        this.rules = cardTerms[cardType].benefits;
    }

    evaluate(tx) {

        const benefits = [];

        // Low confidence -> don't auto-evaluate
        if (tx.confidence < 0.6) {

            return [{
                benefitType: "manualReview",
                eligible: false,
                priority: 0,
                reason:
                    "Receipt extraction confidence is low. Please verify receipt details.",
                nextAction:
                    "Review merchant, amount and category before continuing."
            }];
        }

        benefits.push(...this.evaluateRetail(tx));
        benefits.push(...this.evaluateTravel(tx));

        return benefits.sort((a, b) => a.priority - b.priority);
    }

    //--------------------------------------
    // RETAIL PURCHASES
    //--------------------------------------

    evaluateRetail(tx) {

        const detected = [];

        const retailCategories = [
            "retail",
            "electronics",
            "department_store",
            "furniture"
        ];

        if (!retailCategories.includes(tx.category))
            return detected;

        const purchase = this.checkPurchaseProtection(tx);
        if (purchase) detected.push(purchase);

        const ret = this.checkReturnProtection(tx);
        if (ret) detected.push(ret);

        const warranty = this.checkExtendedWarranty(tx);
        if (warranty) detected.push(warranty);

        return detected;
    }

    //--------------------------------------
    // TRAVEL PURCHASES
    //--------------------------------------

    evaluateTravel(tx) {

        const detected = [];

        const travelCategories = [
            "airline",
            "cruise",
            "train",
            "travel"
        ];

        if (!travelCategories.includes(tx.category.toLowerCase()))
            return detected;

        const delay = this.checkTripDelay(tx);
        if (delay) detected.push(delay);

        return detected;
    }

    //--------------------------------------

    buildBenefit({
        benefitType,
        amount,
        rule,
        priority,
        reason,
        nextAction
    }) {
        return {
            benefitType,
            eligible: true,
            reason,
            amountEligible: amount,
            estimatedPayout: amount,

            proofRequired: rule.requiredProof ?? [],

            nextAction,
            priority,

            metadata: {
                windowDays:
                    rule.claimWindowDays ??
                    rule.windowDays ??
                    90
            }
        };
    }

    //--------------------------------------
    // Purchase Protection
    //--------------------------------------

    checkPurchaseProtection(tx) {

        const rule = this.rules.purchaseProtection;

        if (!rule.enabled)
            return null;

        if (!rule.eligibleMcc.includes(tx.category))
            return null;

        if (tx.amount > rule.perItemCap)
            return null;

        return this.buildBenefit({

            benefitType: "purchaseProtection",

            amount: tx.amount,

            rule,

            priority: 1,

            reason:
                `${tx.category} purchase qualifies for Purchase Protection.`,

            nextAction:
                "Upload receipt and card statement."
        });
    }

    //--------------------------------------

    checkReturnProtection(tx) {

        const rule = this.rules.returnProtection;

        if (!rule.enabled)
            return null;

        // NEW: only eligible categories
        const eligible = [
            "retail",
            "electronics",
            "department_store",
            "furniture"
        ];

        if (!eligible.includes(tx.category))
            return null;

        if (rule.excludedCategories.includes(tx.category))
            return null;

        return this.buildBenefit({

            benefitType: "returnProtection",

            amount:
                Math.min(tx.amount, rule.perItemCap),

            rule,

            priority: 2,

            reason:
                "Retail purchase qualifies for Return Protection.",

            nextAction:
                "Attempt merchant return first."
        });
    }

    //--------------------------------------

    checkExtendedWarranty(tx) {

        const rule = this.rules.extendedWarranty;

        if (!rule.enabled)
            return null;

        // NEW
        const eligible = [
            "electronics",
            "appliances",
            "retail"
        ];

        if (!eligible.includes(tx.category))
            return null;

        return this.buildBenefit({

            benefitType: "extendedWarranty",

            amount: tx.amount,

            rule,

            priority: 3,

            reason:
                "Eligible electronics purchase qualifies for Extended Warranty.",

            nextAction:
                "Keep invoice and manufacturer warranty."
        });
    }

    //--------------------------------------

    checkTripDelay(tx) {

        const rule = this.rules.tripDelay;

        if (!rule.enabled)
            return null;

        if (!rule.eligibleMcc.includes(tx.category))
            return null;

        return this.buildBenefit({

            benefitType: "tripDelay",

            amount: rule.perTripCap,

            rule,

            priority: 4,

            reason:
                "Eligible travel booking qualifies for Trip Delay coverage.",

            nextAction:
                "Keep boarding pass and airline delay confirmation."
        });
    }

}

export default RulesEngine;