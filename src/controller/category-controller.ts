import {CategoryService} from '../service/CategoryService';
import { Request,Response } from 'express';
import { categoryType } from './category-types';

export class CategoryController {
    categoryService;

    constructor(categoryService:CategoryService) {
     this.categoryService = categoryService;
    }

    async create(req:Request,res:Response){
        const {name,priceConfiguration,attributes} = req.body as categoryType;
        const category = await this.categoryService.create({name,priceConfiguration,attributes});
        res.status(200).json({category});
    }

}