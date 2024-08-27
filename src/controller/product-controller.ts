import { Request,Response } from "express";
import { ProductService } from "../service/ProductService";
import { v4 as uuidv4 } from 'uuid';
import { ProductTypes } from "./product-types";
import { Filter } from "./product-types";
import mongoose from "mongoose";
import { FileStorage } from "../FileStorage";
import { UploadedFile } from "express-fileupload";
import KafkaProducerBroker from "../config/kafkaInterface";

export class ProductController {
    
    productService;
    storage;
    kafkaProducer;

    constructor(productService:ProductService,storage:FileStorage,kafkaProducer:KafkaProducerBroker){
        this.productService = productService;
        this.storage = storage;
        this.kafkaProducer=kafkaProducer;
    }

    async create(req:Request,res:Response){
          const image = req.files!.image as UploadedFile; 
          const imageName = uuidv4();

          await this.storage.upload({
            fileName:imageName,
            fileData:image.data.buffer
          })

          const newProduct =await this.productService.create({...req.body,imageName} as ProductTypes);
          await this.kafkaProducer.sendMessage('product',JSON.stringify({id:newProduct.id,priceConfiguration: newProduct.priceConfiguration}));
          res.status(200).json({newProduct});
    }

    async update(req:Request,res:Response){
        const {productId} = req.params;
        const productName = this.productService.getImageById(productId);
        await this.storage.delete(productName as unknown as string);
        const {
        name,description,tenantId,priceConfiguration,attributes,categoryId,isPublished
        } = req.body as ProductTypes;
        
        const image1 = req.files!.image as UploadedFile;
        const imageName = uuidv4();
        await this.storage.upload({
         fileName:imageName,
         fileData:image1.data.buffer
        })
        const product:ProductTypes={name,description,tenantId,imageName,priceConfiguration,attributes,categoryId,isPublished}
        const newProduct = await this.productService.update(productId,product);
        res.status(200).json({newProduct});
  }

  async index(req:Request,res:Response) {
     const {q,tenantId, categoryId,isPublish} = req.query;


     const filters:Filter = {}
    
     if(tenantId)
        filters.tenantId = tenantId as string;

     if(isPublish == 'true')
        filters.isPublish = true;

     if(categoryId && mongoose.Types.ObjectId.isValid(categoryId as string))
        filters.categoryId = new mongoose.Types.ObjectId(categoryId as string);
        
    const res1 = await this.productService.getList(q as string,filters,{page:req.query.page,limit:req.query.limit});
    res.status(200).send(res1);
  }

}