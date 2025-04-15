const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const http = require ('http').Server(app);
const io = require ('socket.io')(http);


app.use(express.static(__dirname)); // 靜態檔 aka HTML
app.use(express.json()); // JSON資料
app.use(bodyParser.urlencoded({ extended: false})); // 表單資料

const messages = [];

app.get('/messages', (req, res) =>{
    res.send(messages)
  })

app.post('/messages', (req, res) =>{
    messages.unshift(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})
io.on('connection', (socket) =>{
    console.log('有人進來囉')
})

const port = process.env.PORT || 3000;
const server = http.listen(port, ()=>{
    console.log(`開始監聽${port}`);
});