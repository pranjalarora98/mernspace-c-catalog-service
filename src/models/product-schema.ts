import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const PriceConfigurationSchema = new mongoose.Schema({
    priceType:{
        type:String,
        enum:['base','additional']
    },
    availableOptions:{
        type: Map,
        of:Number
    }
})

const attributeSchema= new mongoose.Schema({
    name:{
        type: String,
    },
    value:{
        type: mongoose.Schema.Types.Mixed
    }
})

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageName:{
        type: String,
    },
    priceConfiguration:{
        type: Map,
        of: PriceConfigurationSchema
    },
    attributes:[attributeSchema],
    tenantId:{
        type: String,
        required: true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    isPublished:{
      type: Boolean,
      default: false
    }
},{timestamps:true})
productSchema.plugin(mongooseAggregatePaginate);

export default mongoose.model('ProductSchema',productSchema);