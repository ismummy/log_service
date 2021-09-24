require('dotenv').config();
const express = require('express')
const setLogging = require('./utils/logging')
const cors = require("cors")
require('./database/index');
const route = require('./routes/route')
const broker = require('./utils/broker')
const log = require('./controllers/logger')

const app = express()
const port = process.env.PORT || 6000;

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

setLogging(app)

app.use('/', route)

app.use('*', (req, res) => {
    res.status(404).json({
        error: true,
        message: "Ooos, shine your eyes, and check the url!!!"
    });
});

app.use((err, req, res, next) => {
    res.status(500).send({
        error: true,
        hardMessage: "This is a catch error",
        message: err.message
    });
});

app.listen(port, () => {
    broker.getInstance()
        .then(messageBroker => {
            messageBroker.subscribe(process.env.LOGGER_EVENT,  async (msg, ack) => {
                await log.addLog(JSON.parse(msg.content.toString()))
                ack()
            })
        })
    console.log(`LOGGER Service listening at http://localhost:${port}`)
})
