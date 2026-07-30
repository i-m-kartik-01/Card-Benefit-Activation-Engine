import express from "express";

const router = express.Router();

router.post("/", (req, res) => {

    console.log("Gmail Push Notification");

    res.status(204).send();

});

export default router;