import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDB from "./db/db.js";
import userRoute from "./routes/user.route.js";
import expenseRoute from "./routes/expense.route.js";
import cors from "cors";


dotenv.config({});

ConnectDB();

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL,
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
});

