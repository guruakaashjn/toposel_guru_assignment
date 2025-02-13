import express from "express";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
    console.log("WORKING");
    res.status(200).json({
        "status": "working",
    })
})

export default rootRouter;