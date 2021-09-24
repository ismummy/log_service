const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CLOUD_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    }).then(res => console.log('MongoDB connected...'))
    .catch(err => console.log('Error connecting MongoDB:', err))

module.exports = mongoose;
