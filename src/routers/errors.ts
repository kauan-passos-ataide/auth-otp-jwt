import { ErrorRequestHandler, RequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error"});
}

export const requestErrorHandler: RequestHandler = (req, res) => {
    res.status(400).json({ error: "Route not found" });
}