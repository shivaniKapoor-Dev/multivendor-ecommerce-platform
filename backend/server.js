const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');

dotenv.config();

const allowedOrigins = new Set([
    "http://localhost:5173",
    "https://multivendor-ecommerce-platform.vercel.app",
    "https://multivendor-ecommerce-platform.onrender.com",
]);

const allowedOriginPatterns = [
    /^https:\/\/multivendor-ecommerce-platform(?:-[a-z0-9-]+)?\.vercel\.app$/,
    /^https:\/\/multivendor-ecommerce-pl(?:-[a-z0-9-]+)?\.vercel\.app$/,
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        if (allowedOriginPatterns.some((pattern) => pattern.test(origin))) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials:true,
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require('./routes/VendorApprove'));
app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/VendorDashboard'));
app.use('/api', require('./routes/UserInfo'));
app.use('/api', require('./routes/cartRoutes'));
app.use('/api', require('./routes/searchRoutes'));
app.use('/api', require('./routes/orderRoutes'));
app.use('/api', require('./routes/adminRoutes'));
app.use('/api', require('./routes/paymentRoutes'));

const PORT = process.env.PORT || 2425;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
