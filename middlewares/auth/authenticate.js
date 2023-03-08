const jwt = require('jsonwebtoken')

const authenTicate = async (req, res, next) => {
    const token = req.header("token");
    try {
        const userDecode = await jwt.verify(token, "domanh2102") // giải mã token
        if (userDecode) {
            req.user = userDecode;
            return next();
        }
    } catch (error) {
        res.status(500).send("Bạn chưa đăng nhập!")
    }
}

module.exports = { authenTicate }