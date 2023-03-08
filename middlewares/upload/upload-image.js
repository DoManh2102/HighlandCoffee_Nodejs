//upload file
const multer = require('multer')
const mkdirp = require('mkdirp')
const maxSize = 1048576; // 10MB


const uploadImage = (dest) => {
    const made = mkdirp.sync(`./public/image/${dest}`)
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./public/image/${dest}`) // setup đường dẫn lưu file
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname) // đặt lại tên file và đuôi file
        }
    })

    const upload = multer({
        storage: storage,
        fileFilter: function fileFilter(req, file, cb) {
            const extensionImage = [".png", ".jpg"]
            const extentsion = file.originalname.slice(-4);
            extensionImage.includes(extentsion) ? cb(null, true) : cb(new Error('file không hợp lệ'), false)
        },
        limits: { fileSize: maxSize }
    })
    return upload.single(dest)
}


module.exports = { uploadImage }