const { QueueClient, QueueServiceClient } = require("@azure/storage-queue");

const connectionString = "UseDevelopmentStorage=true";
const queueName = "myqueue-project-kay";
const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
const queueClient = queueServiceClient.getQueueClient(queueName);

const addToQueue = async (message) => {
    await queueClient.sendMessage(message);
    console.log(`${message} added to queue ${queueName}`)
};

const readFromQueue = async () => {
    const receivedMessages = await queueClient.receiveMessages({
        numberOfMessages: 1,
    });
    let [message] = receivedMessages.receivedMessageItems;
    if (!message) {
        message = '';
    } else {
        await queueClient.deleteMessage(message.messageId, message.popReceipt);
    }
    console.log(`message dequeued: ${message}`);
    return message.messageText;
};

module.exports = { addToQueue, readFromQueue };
