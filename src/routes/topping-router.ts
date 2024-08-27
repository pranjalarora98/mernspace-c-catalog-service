import express from "express";
import { ToppingController } from "../controller/topping-controller";

const router = express.Router();
const toppingController = new ToppingController();

router.post('/topping/create',(req,res)=>{
   void toppingController.create(req,res)
})

router.put('/topping/update',(req,res)=>{
    void toppingController.update(req,res)
 })


router.delete('/topping/delete',(req,res)=>{
    void toppingController.delete(req,res)
})


export default router;