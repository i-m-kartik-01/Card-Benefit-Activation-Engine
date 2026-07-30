// services/claimGenerator.js

import Claim from "../models/Claim.js";

class ClaimGenerator {

    /**
     * Generate claims from detected benefits.
     *
     * @param {Object} transaction
     * @param {Array} benefits
     *
     * @returns {Array}
     */
    async generate(transaction, benefits) {

        if (!transaction || !transaction._id) {
            throw new Error("Invalid transaction.");
        }

        if (!benefits || benefits.length === 0) {
            return [];
        }

        const createdClaims = [];

        for (const benefit of benefits) {

            // Avoid duplicate claims
            const existingClaim =
                await Claim.findOne({

                    transaction: transaction._id,

                    benefitType: benefit.benefitType

                });

            if (existingClaim) {

                createdClaims.push(existingClaim);

                continue;

            }

            //------------------------------------
            // Calculate deadline
            //------------------------------------

            let deadline = null;

            if (benefit.metadata?.windowDays) {

                deadline = new Date(
                    transaction.transactionDate
                );

                deadline.setDate(
                    deadline.getDate() +
                    benefit.metadata.windowDays
                );

            }

            //------------------------------------
            // Create claim
            //------------------------------------

            const claim = await Claim.create({

                transaction: transaction._id,

                cardType: transaction.cardType,

                benefitType: benefit.benefitType,

                eligibleAmount:
                    benefit.amountEligible,

                claimedAmount:
                    benefit.amountEligible,

                requiredDocuments:
                    benefit.proofRequired,

                metadata:
                    benefit.metadata,

                deadline,

                reason:
                    `Automatically detected for ${benefit.benefitType}.`

            });

            createdClaims.push(claim);

        }

        return createdClaims;

    }

}

export default new ClaimGenerator();