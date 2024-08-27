import Topping from "../models/Topping";
import { Request,Response } from "express";
import { ToppingTypes } from "./topping-types";

export class ToppingController {

  async create(req:Request,res:Response) {
    const {name,image,price,tenantId,isPublish} = req.body as ToppingTypes;
    const newTopping = await Topping.create({name,image,price,tenantId,isPublish}) as ToppingTypes;
    return res.status(200).json({newTopping});
  }

  async update(req:Request,res:Response) {
    const {id} = req.params;
    const {name,image,price,tenantId,isPublish} = req.body as ToppingTypes;
    const newTopping = await Topping.findByIdAndUpdate({id},{$set:{
        name,image,price,tenantId,isPublish
    }}) as ToppingTypes;
    return res.status(200).json({newTopping});
  }
  
  async delete(req:Request,res:Response) {
    const {id} = req.params;
    const newTopping = await Topping.findByIdAndDelete({id}) as ToppingTypes;
    return res.status(200).json({newTopping});
  }

}