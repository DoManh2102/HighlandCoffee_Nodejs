const express = require('express');
const path = require("path");
const { sequelize } = require('./models');
const rootRouter = require('./routers/root');
const app = express();
require('dotenv').config();

// cho phép gọi api trên cùng laptop
const cors = require('cors');
const corsOptions = {
    origin: process.env.URL_REACT,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


// cài ứng dụng sửu dụnng kiểu json từ db
app.use(express.json());
app.use('/api/v1', rootRouter)


// cài static file
const publicPathDirectory = path.join(__dirname, './public');
app.use("/public", express.static(publicPathDirectory));

// lắng nghe sự kiện kết nối
app.listen(process.env.PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`App listening on http://localhost:${process.env.PORT}`);
})
