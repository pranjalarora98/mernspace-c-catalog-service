import { categoryType } from "../controller/category-types";
import Category from "../models/Category";

export class CategoryService {
    async create(category:categoryType){
      const newCategory = new Category(category)
      return newCategory.save();  
    }
}