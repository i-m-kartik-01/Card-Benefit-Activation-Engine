import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import connectDB from "./config/db.js";

import transactionRoutes from "./routes/transactionRoutes.js";
import claimRoutes from "./routes/claims.js";
import benefitRoutes from "./routes/benefits.js";

import pubsubRoutes from "./routes/pubsub.js";

dotenv.config();

const app = express();

// -----------------------------
// Middleware
// -----------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// -----------------------------
// Health Check
// -----------------------------
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Card Benefits Auto Claim API Running 🚀"
    });
});

// -----------------------------
// Routes
// -----------------------------
app.use("/api/transactions", transactionRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/benefits", benefitRoutes);

app.use("/api/pubsub", pubsubRoutes);
app.use("/auth",authRoutes);
// -----------------------------
// 404 Handler
// -----------------------------
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// -----------------------------
// Global Error Handler
// -----------------------------
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        console.log(
            process.env.GROQ_API_KEY
                ? "✅ Groq API key loaded"
                : "❌ GROQ_API_KEY missing"
        );

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to start server");
        console.error(error);
        process.exit(1);
    }
};

startServer();