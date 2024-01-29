const express = require('express')
const app = express()
const port = 3000

app.get('/tin-tuc', (req, res) => {

    var a = 1;
    var b = 2;

    var c = a+b;
    

    return res.send('hello world!');
})

app.listen(port, () => console.log(`Ứng dụng mẫu đang lắng nghe tại http://localhost:${port}`))
