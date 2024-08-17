import { FileData, FileStorage } from "./FileStorage";
import {DeleteBucketCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";


export class S3Storage implements FileStorage {
    
    private client: S3Client;

    constructor(){
        this.client = new S3Client({
            region:'eu-north-1',
            credentials:{
                accessKeyId:'AKIAQKPILVHXR4WG2HPX',
                secretAccessKey:'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'
            }
        })
    }



    async upload(data: FileData): Promise<void> {
        
        const params = {
            Bucket:'mernspace-project-pranjal',
            Key:data.fileName,
            Body:data.fileData
        }
         
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.client.send(new PutObjectCommand(params));

        // throw new Error("Method not implemented.");
    }

    async delete(fileName: string): Promise<void> {
        const params = {
            Bucket:'mernspace-project-pranjal',
            Key:fileName
        }
        await this.client.send(new DeleteBucketCommand(params));
    }
    
    getObjectUri(fileName: string): string {
        throw new Error("Method not implemented.");
    }
     
} 