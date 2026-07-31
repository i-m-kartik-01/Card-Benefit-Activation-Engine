import express from "express";

const router = express.Router();

router.post("/inbound-email", (req, res) => {

    console.log("Incoming Email");

    res.json({
        success: true,
        message: "Webhook received"
    });

});

export default router;