import { ErrorRequestHandler, RequestHandler } from "express";
import { Handler } from "express";


export const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).json({
        type: err.constructor.name,
        message: err.toString(),
    });
}

//función de alto orden
export const errorChecked = (handler: RequestHandler): RequestHandler => {
    return async (req, res, next) => {
        try{
            await handler(req, res, next);
        } catch (e) {
            next (e);
        }
    }
}