/* eslint-disable @typescript-eslint/no-unsafe-return */
import KafkaProducerBroker from '../config/kafka';

let messageProducer;


export const createMessageProducerBroker = () => {
    if (!messageProducer) {
        messageProducer = new KafkaProducerBroker('catalog-service', ['localhost:9092']);
    }
    return messageProducer;
}