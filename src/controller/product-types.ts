import mongoose from "mongoose"
export interface ProductTypes {
    name: string,
    description: string,
    image?: string,
    priceConfiguration: object,
    attributes: string[],
    tenantId: string,
    categoryId: string,
    isPublished: boolean,
    imageName?: string
}

export interface Filter {
    tenantId?: string,
    categoryId?: mongoose.Types.ObjectId,
   isPublish?: boolean
}