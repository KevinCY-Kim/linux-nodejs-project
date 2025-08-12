const http = require('http');
const express = require('express');
const app = express();
const port = 3000;

// 뷰 템플릿 엔진 디렉토리 설정
app.set('view engine', 'ejs'); // 확장자 (suffix)
app.set('views', 'views'); // 경로 (prefix)

// static 디렉토리 설정 (serve-static 미들웨어)
app.use(express.static('public'));

// post 방식의 요청 파라미터 데이터 전달을 위한 설정
// body-parser 미들웨어
app.use(express.json()); // JSON 형식의 요청 본문(body)를 파싱 (Ajax 요청 때)
app.use(express.urlencoded({'extended':false})); 
// HTML form 데이터 전송 처리 (application/x-www-form-urlencoded)

app.get('/hello', (req, res) => {
    // 목록 페이지로 이동
    res.end('<h1>Hello linux nodejs world</h1>');
});

app.get('/todos', (req, res) => {
    // 새 할일 입력 폼에서 전달
    req.app.render('todos', {}, (err, html) => {
        res.end(html);
    });
});

app.post('/todos', (req, res) => {
    console.log('POST - /todos');
    console.dir(req.body);
    res.redirect('/todos');
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`run on server, http://localhost:${port}`);
});