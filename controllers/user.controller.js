const { Op } = require('sequelize');
const { User } = require('../models')
const bcrypt = require('bcrypt');
var gravatar = require('gravatar');

var jwt = require('jsonwebtoken');
const { URL_BACKEND } = require('../routers/configRoute');

const register = async (req, res) => {
    const { email, password, user_name } = req.body;
    try {
        var urlAvata = gravatar.url(email);
        const hashPassword = bcrypt.hashSync(password, 10) // mã hoá password
        const newUser = await User.create({ email, password: hashPassword, user_name, avata: urlAvata })
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email,
        }
    })
    if (user) {
        // console.log('user', user);
        const checkPassword = bcrypt.compareSync(password, user.password); // giải mã hoá password true || false
        if (checkPassword) {
            const token = jwt.sign({ email: user.email, type: user.type }, 'domanh2102', { expiresIn: '24h' });
            res.status(200).send({
                message: "Đăng nhập thành công",
                token,
                user
            })
        } else {
            res.status(500).send("Tài khoản hoặc mật khẩu không chính xác")
        }
    }
    else {
        res.status(404).send("Tài khoản không hợp lệ")
    }
}

// upload avata theo user đăng nhập
const uploadAvata = async (req, res) => {
    const { user, file } = req;
    const urlImg = `${URL_BACKEND}/${file.path}`
    const userFound = await User.findOne({
        where: {
            email: user.email
        }
    })
    userFound.avata = urlImg;
    userFound.save()
    res.status(201).send(userFound)
}

// tìm kiếm theo tên
const getListUser = async (req, res) => {
    const { name } = req.query;
    console.log(name);
    try {
        if (name) {
            const listUser = await User.findAll({
                where: {
                    user_name: {
                        [Op.like]: `%${name}%`
                    }
                }
            })
            res.status(201).send(listUser);
        }
        else {
            const listUser = await User.findAll();
            res.status(201).send(listUser);
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
        where: {
            id,
        }
    })
    try {
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateUser = async (req, res) => {
    const user = req.body;
    const { id } = req.params;
    try {
        const userById = await User.findOne({
            where: {
                id,
            }
        })
        if (userById) {
            const userUpdate = await User.update(user, {
                where: {
                    id,
                }
            })
            res.status(201).send('update thành công')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.destroy({
        where: {
            id,
        }
    })
    if (user) {
        res.status(201).send("xoá thành công")
    }
    else {
        res.status(500).send("not found!")
    }
}


module.exports = {
    register,
    login,
    uploadAvata,
    getListUser,
    getUserById,
    deleteUser,
    updateUser
}