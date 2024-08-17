import express from 'express';
import { CategoryController } from '../controller/category-controller';
import { CategoryService } from '../service/CategoryService';

const router = express.Router();
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);



router.post('/category',(req,res)=>{
    void categoryController.create(req,res);
});

export default router;