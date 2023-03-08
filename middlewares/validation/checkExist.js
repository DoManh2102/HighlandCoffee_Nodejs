
const checkExist = (Model) => {
    return async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        const user = await Model.findOne({
            where: {
                id,
            }
        })
        if (user) {
            return next();
        }
        else {
            res.status(404).send('Error! Không tìm thấy')
        }
    }
}

module.exports = { checkExist }