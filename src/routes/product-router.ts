import express from "express";
import { Request,Response } from "express";
import { ProductController } from "../controller/product-controller";
import { ProductService } from "../service/ProductService";
import { S3Storage } from "../S3Storage";
import fileUpload from "express-fileupload";

const router = express.Router();

const productService = new ProductService();
const s3Storage = new S3Storage();
const productController = new ProductController(productService,s3Storage);

router.post('/product',fileUpload(),(req:Request,res:Response)=>{
    void productController.create(req,res)
});

router.put('/product/:productId',(req:Request,res:Response)=>{
    void productController.update(req,res)
});

router.get('/product',(req:Request,res:Response)=>{
    void productController.index(req,res)
});

export default router;