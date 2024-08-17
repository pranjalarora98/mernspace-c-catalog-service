import app from "./app";
import logger from "./config/logger";
import mongoose from "mongoose";

const startServer = async () => {
    const PORT = 5502;
    try {
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
        await mongoose.connect('mongodb://root:root@localhost:27017/catalog?authSource=admin&w=1');
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
