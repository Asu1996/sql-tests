var express = require('express');
var router = express.Router();

const { readFromQueue } = require('../queue/client');

router.get('/', async (req, res) => {
    try {
        const messageReceived = await readFromQueue();
        res.send(messageReceived);
    } catch (e) {
        console.log(`Error in Read: ${e}`);
    }
});

module.exports = router;