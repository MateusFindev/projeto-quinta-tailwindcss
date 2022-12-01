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
const cadastroRouter = require('./routes/cadastro');

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
app.use('/cadastro', cadastroRouter);

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

app.post('/cadastrar', function (req, res, next) {
  var name = req.body.name;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.passconfirmation;

  var sql = `INSERT INTO alunos (nome, senha, email) VALUES ("${name + " " + lastname}", "${password}", "${email}")`;

  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Row has been updated')
    // req.flash('success', 'Data stored!')
    res.redirect('http://localhost:3000/')
  })
})

app.post('/entrar', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var sql = "SELECT * FROM alunos ORDER BY id DESC";

  db.query(sql, function (err, result) {
    if (err) {
      throw err
    }
    if (result) {
      for (var i=0; i < result.length; i++) {
        if (email == result[i].email) {
          if (password == result[i].senha) {
            console.log('Entrou');
            res.redirect('/inicio')
          } else {
            console.log("Senha incorreta");
          }
        } else {
          console.log("Email incorreto")
        }
      }
    }
  })
})

app.post('/excluir', function(req, res, next) {
  var sala = req.body.salaID;

  var sql = `DELETE FROM professor_sala WHERE ID_sala=${sala}`;
  var sql2 = `DELETE FROM sala WHERE id=${sala}`;

  db.query(sql, function (err, result) {
    if (err) {
      throw err
    }
    db.query(sql2, function (err, result) {
      if (err) {
        throw err
      }
      console.log('Row has been updated')
      res.redirect('/salas')
    })
  })
});

app.post('/adicionar', function (req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  var professor = req.body.professor;

  var sql = `INSERT INTO sala (nome, senha) VALUES ("${name}", "${password}")`;

  db.query('SELECT ID FROM sala ORDER BY id ASC', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('salas', { data: '' })
    } else {
      var sql2 = `INSERT INTO professor_sala (ID_professor, ID_sala) VALUES ("${professor}", "${rows[0].ID}")`;

      db.query(sql, function (err, result) {
        if (err) {
          throw err
        }
        db.query(sql2, function (err, result) {
          if (err) {
            throw err
          }
          console.log('Row has been updated')
          res.redirect('/salas')
        })
      })
    }
  })
})

app.get('/', (req, res) => {
  res.render('index');
});

const server = app.listen(3000, () => {
  console.log(`🚀 The application started on http://localhost:${server.address().port}`);
});