const Log = require('../database/Models/logs')

class Logger {

    getAll = async (req, res, next) => {
        try {
            let {page, limit} = req.query
            page = page || 1
            limit = limit || 10

            const data = await Log.paginate({}, {page, limit});

            return res.status(200).json({data, success: true, message: "Fetched!"})
        } catch (e) {
            next(e)
        }
    }

    addLog = async (content) => {
        try {
            const {searchKeyword, data} = content
            const record = await Log.findOneAndUpdate({searchKeyword}, {result: data, updatedAt: Date.now()}, {
                new: true,
                upsert: true
            });
            console.log(record)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new Logger()
