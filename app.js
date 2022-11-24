const express = require('express');
const path = require('path');

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

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/inicio', inicioRouter);
app.use('/notificacoes', notificacoesRouter);
app.use('/projetos', projetosRouter);
app.use('/atividades', atividadesRouter);
// app.use('/salas', salasRouter);
app.use('/configuracoes', configuracoesRouter);
app.use('/ajuda', ajudaRouter);
app.use('/perfil', perfilRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(3000, () => {
    console.log(`The application started on http://localhost:${server.address().port}`);
});