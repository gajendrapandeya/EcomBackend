const BigPromise = require('../middlewares/bigPromise')

exports.home = BigPromise(async (req, res) => {
    res.status(200).json({
        success: 'Ok',
        greeeting: 'Hello from api'
    })
})

exports.homeDummy = (req, res) => {
    res.status(200).json({
        success: 'Ok',
        greeeting: 'This is another dummy route '
    })
}