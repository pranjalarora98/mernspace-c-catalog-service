import express from 'express';
import { CategoryController } from '../controller/category-controller';
import { CategoryService } from '../service/CategoryService';
import { createMessageProducerBroker } from '../factories/KafkaFactory';

const router = express.Router();
const categoryService = new CategoryService();
const createMessageProducerBroker = new createMessageProducerBroker(); 
const categoryController = new CategoryController(categoryService,createMessageProducerBroker);

router.post('/category',(req,res)=>{
    void categoryController.create(req,res);
});

export default router;