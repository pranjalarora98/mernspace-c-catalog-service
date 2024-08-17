import productSchema from "../models/product-schema";
import { Filter, ProductTypes } from "../controller/product-types";

export class ProductService {
  
    async create(product:ProductTypes){
          const newProduct = new productSchema(product);
          await newProduct.save();
          return newProduct;
    }

    async update(productId:string,product:ProductTypes){
        const updatedProduct = productSchema.findOneAndUpdate({_id:productId},{$set:product},{new:true});
        return updatedProduct
  }

  async getImageById(productId) {
    const product = productSchema.findById(productId);
    return product.imageName as string;
  }

  async getList(q:string,filters:Filter,pageQuery:any) {
      const regexp = new RegExp(q,'i');

       const matchQuery = {
            ...filters,
            name: regexp
       }


       const aggregate = productSchema.aggregate([{$match:matchQuery}]);
       return productSchema.aggregatePaginate(aggregate,{page:Number(pageQuery.page),limit:Number(pageQuery.limit)});

      //  const result = aggregate.exec();

      //  return result as ProductTypes[];
  }

}