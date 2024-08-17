import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import productRouter from './routes/product-router';
import expressFileUpload from 'express-fileupload';

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});
app.use(express.json());
app.use(globalErrorHandler);
app.use(productRouter);
app.use(expressFileUpload);

export default app;
