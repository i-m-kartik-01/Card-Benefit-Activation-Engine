import express from "express";

import {

    scanInbox

} from "../controllers/gmailController.js";

const router = express.Router();

router.post(

    "/scan",

    scanInbox

);

export default router;