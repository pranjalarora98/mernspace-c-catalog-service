import mongoose from 'mongoose';

const Topping = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required: true,
  },
  tenantId:{
    type: String,
    required: true
  },
  isPublish:{
    type:Boolean,
    required: true
  }
})

export default mongoose.model('Topping',Topping);