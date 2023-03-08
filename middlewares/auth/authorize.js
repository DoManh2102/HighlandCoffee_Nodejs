const authorize = (req, res, next) => {
    const { user } = req;
    const typeUser = Object.values(user).find(key => key == "Admin") // check type user 
    if (typeUser == "Admin") {
        next();
    } else {
        res.status(403).send('Bạn chưa được cấp quyền!')
    }
}

module.exports = { authorize }