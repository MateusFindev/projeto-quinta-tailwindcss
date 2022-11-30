const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require('./routes/index');
const inicioRouter = require('./routes/inicio');
const notificacoesRouter = require('./routes/notificacoes');
const projetosRouter = require('./routes/projetos');
const atividadesRouter = require('./routes/atividades');
const salasRouter = require('./routes/salas');
const configuracoesRouter = require('./routes/configuracoes');
const ajudaRouter = require('./routes/ajuda');
const perfilRouter = require('./routes/perfil');
const loginRouter = require('./routes/login');
const addSala = require('./routes/adicionar_sala');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'webslesson',
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
  resave: false
}));

app.use(flash());

app.use('/', indexRouter);
app.use('/inicio', inicioRouter);
app.use('/notificacoes', notificacoesRouter);
app.use('/projetos', projetosRouter);
app.use('/atividades', atividadesRouter);
app.use('/salas', salasRouter);
app.use('/configuracoes', configuracoesRouter);
app.use('/ajuda', ajudaRouter);
app.use('/perfil', perfilRouter);
app.use('/login', loginRouter);
app.use('/adicionar_sala', addSala);

app.post('/save', function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var sql = `INSERT INTO alunos (nome, senha, email) VALUES ("${name}", "${password}", "${email}")`;

  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Row has been updated')
    // req.flash('success', 'Data stored!')
    res.redirect('/inicio')
  })
})

app.post('/adicionar', function (req, res, next) {
  var name = req.body.name;
  var password = req.body.password;

  var sql = `INSERT INTO sala (nome, senha) VALUES ("${name}", "${password}")`;

  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Row has been updated')
    res.redirect('/salas')
  })
})

app.get('/', (req, res) => {
  res.render('index');
});

const server = app.listen(3000, () => {
  console.log(`🚀 The application started on http://localhost:${server.address().port}`);
});