var express = require('express');
var router = express.Router();

const { addToQueue } = require('../queue/client');

router.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(req.body);
    try {
        console.log('mil gaya');
        await addToQueue(message);
        res.send({ message: 'Done!' });
    } catch (e) {
        console.log(`Error in Add: ${e}`);
        res.status(400).send({ message: `Error in Add: ${e}` });
    }
});

module.exports = router;
