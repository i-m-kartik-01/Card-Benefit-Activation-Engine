import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "All supported card benefits"
    });
});

router.get("/:cardType", (req, res) => {
    res.json({
        message: `Benefits for ${req.params.cardType}`
    });
});

export default router;