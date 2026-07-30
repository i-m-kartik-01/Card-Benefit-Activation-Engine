import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Get all claims"
    });
});

router.get("/:id", (req, res) => {
    res.json({
        message: `Claim ${req.params.id}`
    });
});

router.post("/", (req, res) => {
    res.json({
        message: "Create claim",
        body: req.body
    });
});

router.patch("/:id", (req, res) => {
    res.json({
        message: `Update claim ${req.params.id}`
    });
});

router.delete("/:id", (req, res) => {
    res.json({
        message: `Delete claim ${req.params.id}`
    });
});

export default router;