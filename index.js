import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.set('json spaces', 0);
app.use(express.json({ limit: "1mb" }));
app.use(cors());
app.use(helmet());

const EMAIL = process.env.OFFICIAL_EMAIL;

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

app.get("/health", (req, res) => {
    res.status(200).json({
        is_success: true,
        official_email: EMAIL
    });
});

app.post("/bfhl", async (req, res) => {
    try {
        const body = req.body;
        const keys = Object.keys(body);
        
        if (keys.length !== 1) {
            return res.status(400).json({
                is_success: false,
                error: "Request must contain exactly one key"
            });
        }
        
        const key = keys[0];
        const value = body[key];
        let result;
        
        if (key === "fibonacci") {
            if (!Number.isInteger(value) || value < 0) {
                return res.status(400).json({ is_success: false });
            }
            result = [];
            let num1 = 0, num2 = 1;
            for (let i = 0; i < value; i++) {
                result.push(num1);
                let temp = num1 + num2;
                num1 = num2;
                num2 = temp;
            }
        } else if (key === "prime") {
            if (!Array.isArray(value)) {
                return res.status(400).json({ is_success: false });
            }
            result = value.filter(num => Number.isInteger(num) && isPrime(num));
        } else if (key === "lcm") {
            if (!Array.isArray(value) || value.length === 0 || !value.every(n => Number.isInteger(n) && n > 0)) {
                return res.status(400).json({ is_success: false });
            }
            result = value.reduce((acc, curr) => lcm(acc, curr));
        } else if (key === "hcf") {
            if (!Array.isArray(value) || value.length === 0 || !value.every(n => Number.isInteger(n) && n > 0)) {
                return res.status(400).json({ is_success: false });
            }
            result = value.reduce((acc, curr) => gcd(acc, curr));
        } else if (key === "AI") {
            if (typeof value !== "string" || value.trim() === "") {
                return res.status(400).json({ is_success: false });
            }
            try {
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                    {
                        contents: [{ parts: [{ text: `${value}\n\nProvide only a single-word answer, nothing else.` }] }]
                    }
                );
                const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Unknown";
                result = text.trim().split(/\s+/)[0].replace(/[.,!?;:]/g, '');
            } catch (error) {
                return res.status(500).json({ is_success: false, error: "AI service unavailable" });
            }
        } else {
            return res.status(400).json({
                is_success: false,
                error: "Invalid key"
            });
        }
        
        return res.status(200).json({
            is_success: true,
            official_email: EMAIL,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            is_success: false,
        });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});