const express = require('express');
const cors = require('cors');

const multer = require('multer');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const fileName = 'sdsd' + file.originalname;
        req.fileName = fileName;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), (req, res) => {
    res.send(req.fileName);
})

// multer end


app.get('/upload', (req, res) => {
    res.send('upload server is on')
})

app.get('/mosh.jpg', (req, res) => {
    res.send('trying to get mosh')
})

app.listen(5000, () => {
    console.log('Express is listening on port 5000');
});