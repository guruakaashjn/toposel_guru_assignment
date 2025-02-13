import express from "express";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();
const serverPort = process.env.PORT;

app.use(express.json());
app.use('/api/v1/users', userRoute);
app.all('*', (req, res) => {
    res.status(404).json({ "error": "Page not found" });
})
app.use((err, req, res, next) => {
    res.status(500).json({
        "error": "Internal server error",
        "message": err.message
    });
});

const server = async () => {
    try {
        console.log("Starting to run the Server...");
        await connect();
        app.listen(serverPort, () => {
            console.log(`Server is runnig on port ${serverPort}`);
        });
    } catch (error) {
        console.log("Server error", error);
        process.exit(1);
    }
}

server();
