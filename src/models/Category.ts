import mongoose from 'mongoose';

interface Attribute {
    name: string;
    widgetType : 'switch' | 'radio';
    defaultValue: string;
    availableOptions: string[]
}

interface PriceConfiguration {
    priceType : 'base' | 'additional',
    availableOptions : string[] 
}

export interface Category {
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes : Attribute[]
}

const attributeSchema = new mongoose.Schema<Attribute>({
  name:{
    type:String,
  },
  widgetType:{
    type: String
  },
  defaultValue:{
    type:String
  },
  availableOptions:{
    type: [String]
  }
})

const categorySchema = new mongoose.Schema<Category>({
    name:{
        type:String
    },
    priceConfiguration:{
        type:Object
    },
    attributes:{
        type:[attributeSchema]
    }
})

export default mongoose.model('Category',categorySchema);