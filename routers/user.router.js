const express = require('express');
const { register, login, getListUser, getUserById, deleteUser, updateUser, uploadAvata } = require('../controllers/user.controller');
const { User } = require('../models')
const { checkExist } = require('../middlewares/validation/checkExist') // check id có tồn tại
const { authenTicate } = require('../middlewares/auth/authenticate'); // check xem tài khoản đã đăng nhập
const { authorize } = require('../middlewares/auth/authorize'); // check quyền đăng nhập là admin
const { uploadImage } = require('../middlewares/upload/upload-image');
const userRouter = express.Router();


userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/upload-avata', authenTicate, uploadImage("avata"), uploadAvata);
userRouter.get('/', getListUser);
userRouter.get('/:id', authenTicate, getUserById);
userRouter.delete('/:id', authenTicate, authorize, checkExist(User), deleteUser);
userRouter.post('/:id', authenTicate, authorize, checkExist(User), updateUser);

module.exports = userRouter;

