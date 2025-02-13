import express from "express";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import rootRouter from "./routes/rootRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();
const serverPort = process.env.PORT;

app.use(express.json());

app.use('/api/v1', rootRouter);
app.use('/api/v1/user', userRoute);

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
