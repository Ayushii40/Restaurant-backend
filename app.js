import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errOrMiddleware } from "./error/error.js";
import reservationRoute from "./routes/reservationRoute.js";
import userRoute from "./routes/userRoute.js";
import dishRoute from "./routes/dishRoute.js";

const app = express();

// Connect frontend and allow requests
app.use(cors({
    origin: true, // Allow all origins in development to fix connectivity issues
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get('/', (req, res) => {
    res.json({ success: true, message: "Backend is running" });
});

// Routes
app.use('/api/v1/reservation', reservationRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/dish', dishRoute);

// Error handler
app.use(errOrMiddleware);

export default app;
