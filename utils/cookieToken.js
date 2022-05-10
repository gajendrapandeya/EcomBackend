const cookieToken = (user, res) => {
    const token = user.getJwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_TOKEN
        ),
        httpOnly: true
    }

    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}


module.exports = cookieToken