import app from "./app";
import logger from "./config/logger";
import mongoose from "mongoose";
import {createMessageProducerBroker} from './factories/KafkaFactory';
import kafkaInterface from "./config/kafkaInterface";

const startServer = async () => {
    const PORT = 5502;
    try {
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
        await mongoose.connect('mongodb://root:root@localhost:27017/catalog?authSource=admin&w=1');
        const broker:kafkaInterface = new createMessageProducerBroker();
        // const broker = new KafkaProducerBroker('catalog-service',['localhost:9092']);
        await broker.connect();
        logger.info('Database connected successfully');
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on("finish", () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
